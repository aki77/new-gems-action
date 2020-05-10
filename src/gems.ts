import fs from 'fs'
import path from 'path'
import execa, {command} from 'execa'

interface Gem {
  name: string
  groups: string[]
}

interface GemInfo {
  summary?: string
  homepage?: string
  path?: string
}

export type GemWithInfo = Gem & GemInfo

const INFO_PREFIXES = ['Summary', 'Homepage', 'Path']

const getGems = async (gemfile: string): Promise<Gem[]> => {
  const parseScript = path.resolve(__dirname, '../parse_gemfile.rb')
  const {stdout} = await command(`bundle exec ruby ${parseScript} ${gemfile}`)

  return JSON.parse(stdout)
}

const gemInfo = async (gem: Gem): Promise<GemInfo> => {
  const {stdout} = await command(`bundle info ${gem.name}`)
  const entries = stdout
    .split('\n')
    .map(line => line.trim())
    .filter(line => INFO_PREFIXES.some(prefix => line.startsWith(prefix)))
    .map(line => {
      const [key, ...parts] = line.split(':')
      return [key.toLowerCase(), parts.join(':').trim()]
    })

  return Object.fromEntries(entries)
}

const mergeGemInfo = async (gem: Gem): Promise<GemWithInfo> => {
  return {
    ...gem,
    ...(await gemInfo(gem))
  }
}

const detectNewGems = async (): Promise<GemWithInfo[]> => {
  const subProcess = execa('git', [
    'show',
    `remotes/origin/${process.env.GITHUB_BASE_REF}:Gemfile`
  ])
  subProcess.stdout?.pipe(fs.createWriteStream('.Gemfile.base'))
  await subProcess

  const gems = await getGems('Gemfile')
  const baseGemNames = (await getGems('.Gemfile.base')).map(({name}) => name)
  const newGems = gems.filter(({name}) => !baseGemNames.includes(name))

  return await Promise.all(newGems.map(mergeGemInfo))
}

export {getGems, mergeGemInfo, detectNewGems}

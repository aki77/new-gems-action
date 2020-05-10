import path from 'path'
import * as core from '@actions/core'
import execa from 'execa'

async function run(): Promise<void> {
  try {
    const parseScript = path.resolve(__dirname, '../parse_gemfile.rb')

    const {stdout} = await execa.command(
      `bundle exec ruby ${parseScript} Gemfile`
    )
    core.debug(`stdout: ${stdout}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

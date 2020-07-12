import * as core from '@actions/core'
import * as github from '@actions/github'
import markdownTable from 'markdown-table'
import replaceComment from '@aki77/actions-replace-comment'
import {GemWithInfo} from './gems'

const toMarkdownString = (text?: string): string =>
  text ? text.replace(/\r?\n/g, '') : ''

const createComment = async (newGems: GemWithInfo[]): Promise<void> => {
  const gemRows = newGems.map(gem => {
    return [
      `[${gem.name}](${gem.homepage_uri})`,
      gem.groups.join(', '),
      toMarkdownString(gem.authors),
      toMarkdownString(gem.info)
    ]
  })
  const table = markdownTable([
    ['Name', 'Groups', 'Authors', 'Summary'],
    ...gemRows
  ])

  const body = `## :gem: New Gems!
<details>
<summary>Detail</summary>

${table}
</details>
`

  const data = await replaceComment({
    token: core.getInput('token', {required: true}),
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    issue_number: github.context.issue.number,
    body
  })

  if (!data) {
    core.debug('Already commented.')
  }
}

export {createComment}

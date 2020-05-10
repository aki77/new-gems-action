import * as core from '@actions/core'
import * as github from '@actions/github'
import markdownTable from 'markdown-table'
import replaceComment from '@aki77/actions-replace-comment'
import {GemWithInfo} from './gems'

const createComment = async (newGems: GemWithInfo[]): Promise<void> => {
  const gemRows = newGems.map(gem => {
    return [
      `[${gem.name}](${gem.homepage})`,
      gem.groups.join(', '),
      `${gem.summary}`
    ]
  })
  const table = markdownTable([['Name', 'Groups', 'Summary'], ...gemRows])

  const body = `## :gem: New Gems!
<details>
<summary>Detail</summary>

${table}
</details>
`

  await replaceComment({
    token: core.getInput('token', {required: true}),
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    issue_number: github.context.issue.number,
    body
  })
}

export {createComment}

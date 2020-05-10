import * as core from '@actions/core'
import {detectNewGems} from './gems'
import {createComment} from './comment'

async function run(): Promise<void> {
  try {
    const newGems = await detectNewGems()

    if (newGems.length > 0) {
      await createComment(newGems)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

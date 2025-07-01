/* eslint-disable import/no-unresolved */
import * as core from '@actions/core';
import { createComment } from './comment.js';
import { detectNewGems } from './gems.js';

async function run(): Promise<void> {
  try {
    const newGems = await detectNewGems();

    if (newGems.length > 0) {
      await createComment(newGems);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();

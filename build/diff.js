import { spawnSync } from 'child_process';
import multimatch from 'multimatch';

const diff = () => {
  if (!process.env.COMMIT_REF || !process.env.CACHED_COMMIT_REF) return null;
  try {
    const out = spawnSync('git', [
      'diff',
      '--name-only',
      process.env.COMMIT_REF,
      process.env.CACHED_COMMIT_REF,
    ])
      .stdout.toString()
      .split('\n');
    return multimatch(out, ['content/**/*']);
  } catch (e) {
    return null;
  }
};

export default diff;

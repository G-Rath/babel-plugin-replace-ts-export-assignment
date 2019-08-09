import * as child_process from 'child_process';

/**
 * Adds the given files to git, via `git add <file>`.
 *
 * @param {Array<string>} files array of fully quantified paths to files that should be added to the git commit.
 * @param {string} cwd the current working directory to use.
 */
export const addToGit = (files: string[], cwd: string) => {
  console.log(
    'adding the following files to commit:',
    ...files.map(file => `\n > ${file}`)
  );

  child_process.execSync(`git add ${files.join(' ')}`, { cwd });
};

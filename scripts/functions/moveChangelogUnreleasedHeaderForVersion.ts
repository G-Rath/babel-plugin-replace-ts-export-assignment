import * as fs from 'fs';

/**
 * Builds a string representing the given date that's a valid
 * value for the `time` property in a `composer.json` file.
 *
 * The returned string will have the format 'YYYY-MM-DD'.
 *
 * @param {Date} date
 *
 * @return {string}
 */
const buildTimeString = (date: Date): string => {
  const year = date.getFullYear();
  const day = `${date.getDate()}`;
  const month = `${(date.getMonth() + 1)}`;

  return [
    year,
    month.padStart(2, '0'),
    day.padStart(2, '0')
  ].join('-');
};

/**
 * Moves the `[Unreleased]` header in `CHANGELOG.md` up,
 * adding the header for the given version in it's place.
 *
 * @param {string} newVersion the version string to swap the `[Unreleased]` header with.
 * @param {string} changelogPath the path to the `CHANGELOG.md` file.
 */
export const moveChangelogUnreleasedHeaderForVersion = (
  newVersion: string,
  changelogPath: string
) => {
  const oldChangelogFile = fs.readFileSync(changelogPath).toString();
  const newChangelogFile = oldChangelogFile.replace(
    '## [Unreleased]', [
      '## [Unreleased]',
      null, // there should be a blank line between ## [Unreleased] & the new version header
      `## [${newVersion}] - ${buildTimeString(new Date())}`
    ].join('\n')
  );

  fs.writeFileSync(changelogPath, `${newChangelogFile.trimRight()}\n\n`);
};

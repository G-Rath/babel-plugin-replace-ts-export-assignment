import { transform } from '@babel/core';
import dedent from 'dedent';
import { join } from 'path';

export const runPlugin = (code: string) => {
  const results = transform(code, {
    babelrc: false,
    filename: 'test.ts',
    plugins: [join(__dirname, '..', '..', 'src', 'index.ts')],
    presets: ['@babel/preset-typescript']
  });

  if (!results) {
    throw new Error('Failed to compile code - something went very wrong');
  }

  return results.code;
};

describe('code transformations', () => {
  test.each<[string, string]>([
    [
      'export = {};',
      'module.exports = {};'
    ],
    [
      '// export = {};',
      '// export = {};'
    ],
    [
      'export default {};',
      'export default {};'
    ],
    [
      'export const mod = {};',
      'export const mod = {};'
    ],
    [
      `
      export = {};
      export default {};
      `,
      `
      module.exports = {};
      export default {};
      `
    ],
    [
      `
      /**
       * This does something related to module.exports and export =
       * but it's a secret.
       */
      export const mod = () => {
        throw new Error('why are you trying to use this?!');
      };

      export const val = expect;

      export = mod;
      `,
      `
      /**
       * This does something related to module.exports and export =
       * but it's a secret.
       */
      export const mod = () => {
        throw new Error('why are you trying to use this?!');
      };
      export const val = expect;
      module.exports = mod;
      `
    ]
  ])('snippet %# is transformed as expected', (code, expected) => {
    expect(runPlugin(dedent(code))).toStrictEqual(dedent(expected));
  });
});

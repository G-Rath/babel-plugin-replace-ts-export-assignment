# babel-plugin-replace-ts-export-assignment

Allows [export assignment](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require) syntax to be used 
when compiling TypeScript with `@babel/preset-typescript`.

This works by simply replacing `export =` with `module.exports`, to keep CJS semantics.

#### Linting

To run `eslint` on the project, run:

```
npm run lint
```

#### Testing

To run `jest` on the project, run:

```
npm run test
```

#### Checking

To check that the project is type safe, run:

```
npm run check
```

#### Building

To compile the project using `TypeScript`, run:

```
npm run build
```

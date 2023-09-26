# nl-portal-libraries

`nl-portal-libraries` is a collection of packages aimed at providing a configurable portal
implementation for municipalities.

The resulting portal implementation is built up of reusable components that fit the specifications
of the [NL Design System](https://designsystem.gebruikercentraal.nl/).

The look and feel of these components can be customized through the use of design tokens. Moreover,
the back-end systems with which the implementation communicates can be configured, providing each
municipality with their own unique environment and data.

All such configuration takes place in the implementation [@nl-portal/nl-portal-app](./packages/app).

## Development

To contribute to this repository, first [clone](https://git-scm.com/docs/git-clone) it to your
device.

Make sure to [install yarn](https://yarnpkg.com/getting-started/install).

### Installing dependencies

Install dependencies for all projects in the [packages](./packages) directory with the command
`lerna bootstrap` or `yarn run bootstrap` from the project root.

Avoid using commands like `yarn install`, either from the project root, or from any of the
[packages](./packages) directories.

_Tip: [Lerna](https://github.com/lerna/lerna) might not be installed when running `lerna bootstrap`
for the first time. If this is the case, either install it globally with `yarn global add lerna`, or
run it through [npx](https://www.npmjs.com/package/npx): `npx lerna bootstrap`._

### Starting the project

After installing dependencies, start the project with `yarn run start` from the project root.

This commands runs all the `start` scripts of each of the individual packages in the
[packages](./packages) directory in parallel.

Please note that on first run, all packages must have been built first. Please refer to the section
below.

_Tip: Packages can started individually by running `yarn run start` from their respective
directories._

### Building

After installing dependencies, build the project with `yarn run build` from the project root.

This commands runs all the `build` scripts of each of the individual packages in the
[packages](./packages) directory.

_Tip: Packages can built individually by running `yarn run build` from their respective
directories._

### Testing

Testing in this project is done with [Jest](https://jestjs.io/). Run the tests of all packages with
`yarn run test` from the project root. To keep watching the tests for any changes, use
`yarn run test:watch`.

### Linting

Testing in this project is done with [ESLint](https://eslint.org/). Look for linting errors in all
packages by running `yarn run lint` from the project root. Use `yarn run lint:fix` to automatically
fix these errors.

### Prettifying

Prettifying in this project is done with [Prettier](https://prettier.io/). Look for formatting
errors in all packages by running `yarn run prettier` from the project root. Use
`yarn run prettier:fix` to automatically fix these errors.

### Adding dependencies

To add a dependency to _all individual packages_, use `lerna add <package-name>` from the project
root. For example: `lerna add jest`.

To add a dependency to one or more specific packages use
`lerna add <package-name> --scope=<package-name>`. For example, to add Jest as a dependency to
[@nl-portal/nl-portal-app](./packages/app) and
[@nl-portal/nl-portal-user-interface](./packages/user-interface), use:
`lerna add jest --scope=@nl-portal/nl-portal-app --scope=@nl-portal/nl-portal-user-interface`.

If you must add a devDependency to the root project, use `yarn add <package-name> --dev -W` from the
project root. For example: `yarn add jest --dev -W`.

### Local dependencies

Packages inside the [packages](./packages) folder may depend on each other, simply by adding them to
their respective `package.json` files and running `yarn run bootstrap` from the project root
afterwards.

For example, the `package.json` of [@nl-portal/nl-portal-app](./packages/app) might include
`"@nl-portal/nl-portal-user-interface": "0.1.0"` in its list of dependencies. For this to work, the
version number in the `package.json` of
[@nl-portal/nl-portal-user-interface](./packages/user-interface) must also be `"0.1.0"`.

### Tips and guidelines for development

- It is advisable to install IDE plugins for [ESLint](https://eslint.org/) and
  [Prettier](https://prettier.io/). Make sure they use the configurations from the project root. You
  can set the plugins to automatically fix any errors on saving your files.
- Please use TypeScript as much as possible.
- [Use index files for more readable imports.](https://www.bettercoder.io/best-practices/69/use-indexts-to-simplify-imports)
- Please write unit tests for your code.

## Project structure

The set-up of this project is a [Lerna monorepo](https://github.com/lerna/lerna) using
[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Individual packages are stored in the [packages](./packages) directory. Each package has its own
`package.json` file, which includes dependencies and its own `build` and `start` scripts.

The implementation package [@nl-portal/nl-portal-app](./packages/app) was generated with
[create-react-app](https://create-react-app.dev/docs/adding-typescript/) using the TypeScript
preset. It uses other packages in this project as dependencies. Custom implementations can be based
on this package.

Other packages - such as [@nl-portal/nl-portal-user-interface](./packages/user-interface) - were
generated with [create-react-library](https://www.npmjs.com/package/create-react-library). They
serve as dependencies for the implementation, so that each future implementation can be kept
up-to-date easily.

### Adding a new package

New packages can be created in their own directory, inside the [packages](./packages) directory.

Although not obligatory, it is advised to generate them with
[create-react-library](https://www.npmjs.com/package/create-react-library), or follow the example of
packages like [@nl-portal/nl-portal-user-interface](./packages/user-interface), which were generated
with this command. This has the advantage of providing you with out-of-the-box TypeScript support
and `build` and `start` scripts.

Please prefix your package name with `@nl-portal/*` and include the following in its `package.json`:

```
"author": "Municipality of The Hague",
"license": "EUPL-1.2",
```

_Tip: Make sure your newly created package does not contain its own git repository._

Please set the version number of your package dependencies to match the version numbers of
dependencies of other packages, so that [Lerna](https://github.com/lerna/lerna) can combine these
dependencies.

Each package must have their own `.eslintignore`, `.gitignore` and `.prettierignore` files. These
files include things such as the `dist` and `node_modules` folders.

Linting and prettifying is done from the root project, so make sure to remove any configuration
files (such as `.eslintrc.json` or `.prettierrc.json`) from your project if they are included by
default.

Testing is done by [Jest](https://jestjs.io/) from the root project. To make this work for your new
package, remove any testing configuration files, and add a file `jest.config.js` to the root
directory of your packages with the following content:

```
const base = require('../../jest.config.base');
const pack = require('./package.json');

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
};
```

Any additional testing settings - such as `setupFilesAfterEnv` - can be added to this configuration
file.

### Configuration

Environment variables are loaded from the implementation [@nl-portal/nl-portal-app](./packages/app)
by default. Possible configuration values are specified in the
[Config interface](./packages/app/src/interfaces/config.ts).

These values are set to the window object by [config.js](./packages/app/public/config.js), which
also contains the default values for local development.

When starting the app through Docker, these values can be optionally overridden, i.e.:

```
docker run --name test -e KEYCLOAK_URL=thekeycloakurl -e KEYCLOAK_REALM=therealrealm -e KEYCLOAK_CLIENT_ID=theclientid -e KEYCLOAK_REDIRECT_URI=theredirecturi GRAPHQL_URI=thegraphqluri -dp 3000:3000 test1
```

### GraphQL

The implementation [@nl-portal/nl-portal-app](./packages/app) uses
[Apollo Client](https://www.apollographql.com/docs/react/) through the package
[@nl-portal/nl-portal-api](./packages/api) to communicate with the GraphQL back-end.

New queries can be added as exported JavaScript variables from separate files
[in the queries folder](./packages/api/src/queries).

Running `lerna codegen` from the project root will then generate TypeScript code based on these
query files. For this to succeed, the GraphQL API endpoint specified in
[codegen.yml](./packages/api/codegen.yml) must be available.

Once the codegen completes, the queries are exported as hooks from
[@nl-portal/nl-portal-api](./packages/api) and can be imported and used inside a functional
component:

```
...
import {useGetZakenQuery} from '@nl-portal/nl-portal-api';

const CasesPage = () => {
  const {data, loading, error, refetch} = useGetZakenQuery();
  ...
}
```

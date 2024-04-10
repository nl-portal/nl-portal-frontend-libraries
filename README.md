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

Make sure to [install pnpm](https://pnpmpkg.com/getting-started/install).

### Installing dependencies

Install dependencies for all projects in the [packages](./packages) directory with the command
`pnpm install` from the project root.

### Starting the project

After installing dependencies, start the project with `pnpm dev` from the project root.

This commands runs all the `start` scripts of each of the individual packages in the
[packages](./packages) directory in parallel.

Please note that on first run, all packages must have been built first. Please refer to the section
below.

_Tip: Packages can started individually by running `pnpm dev` from their respective
directories._

### Building

After installing dependencies, build the project with `pnpm build` from the project root.

This commands runs all the `build` scripts of each of the individual packages in the
[packages](./packages) directory.

_Tip: Packages can built individually by running `pnpm build` from their respective
directories._

### Testing

Testing in this project is done with [Vitest](https://vitest.dev/). Run the tests of all packages with
`pnpm test` from the project root. To keep watching the tests for any changes, use `pnpm test:watch`.

### Linting

Testing in this project is done with [ESLint](https://eslint.org/). Look for linting errors in all
packages by running `pnpm lint` from the project root. Use `pnpm lint:fix` to automatically fix these errors.

### Prettifying

Prettifying in this project is done with [Prettier](https://prettier.io/). Look for formatting
errors in all packages by running `pnpm prettier` from the project root. Use
`pnpm prettier:fix` to automatically fix these errors.

### Adding dependencies

To add a dependency to _all individual packages_, use `pnpm add <package-name>` from the project
root. For example: `pnpm add vitest`.

To add a dependency to one or more specific packages use
`pnpm add <package-name> --scope=<package-name>`. For example, to add Vitest as a dependency to
[@nl-portal/nl-portal-app](./packages/app) and
[@nl-portal/nl-portal-user-interface](./packages/user-interface), use:
`pnpm add vitest --scope=@nl-portal/nl-portal-app --scope=@nl-portal/nl-portal-user-interface`.

If you must add a devDependency to the root project, use `pnpm add <package-name> --dev -W` from the
project root. For example: `pnpm add vitest --dev -W`.

### Local dependencies

Packages inside the [packages](./packages) folder may depend on each other, simply by adding them to
their respective `package.json` files and running `pnpm install` from the project root
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
[pnpm Workspaces](https://classic.pnpmpkg.com/en/docs/workspaces/).

Individual packages are stored in the [packages](./packages) directory. Each package has its own
`package.json` file, which includes dependencies and its own `build` and `start` scripts.

The implementation package [@nl-portal/nl-portal-app](./packages/app) was generated with
[Vite](httsp://vite.dev) using the TypeScript preset. It uses other packages in this project as dependencies. Custom implementations can be based
on this package.

Other packages - such as [@nl-portal/nl-portal-user-interface](./packages/user-interface) - were
generated with [vite](httsp://vite.dev). They serve as dependencies for the implementation, so that each future implementation can be kept up-to-date easily.

### Adding a new package

New packages can be created in their own directory, inside the [packages](./packages) directory.

Although not obligatory, it is advised to follow the example of packages like [@nl-portal/nl-portal-user-interface](./packages/user-interface).

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

### Configuration

Environment variables are loaded from the implementation [@nl-portal/nl-portal-app](./packages/app)
by default. Possible configuration values are specified in the
[Config interface](./packages/app/src/interfaces/config.ts).

These values are set to the window object by [config.js](./packages/app/public/config.js), which
also contains the default values for local development.

Another configuration option is the authentication methods, which must include the mapping for the 'middel' claim in the JWT token, and the type of login (person, company, proxy). Example snippet for in the implementation:

```
...
const authenticationMethods = {
  person: ["digid", "machtigen"],
  company: ["eherkenning", "bewindvoering"],
  proxy: ["machtigen", "bewindvoering"],
};
...
const App = () => {
...
return (
    <div className={config.THEME_CLASS}>
      <KeycloakWrapper
        clientId={config.KEYCLOAK_CLIENT_ID}
        realm={config.KEYCLOAK_REALM}
        url={config.KEYCLOAK_URL}
        redirectUri={config.KEYCLOAK_REDIRECT_URI}
        authenticationMethods={authenticationMethods}
      >
      ...
      </KeycloakWrapper>
    </div>
  );
};
...
```

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

Running `pnpm codegen` from the project root will then generate TypeScript code based on these
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

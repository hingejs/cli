# Project

## Installation

The following software is required.

- https://nodejs.org/en/

> Note that when you install `node.js`, `npm` is also installed

| Node  | NPM | Git |
|:---------:|:---------:|:---------:|
|  v.10+ | v.6+ | &check; |

Once the repository is cloned go into the root folder where the `package.json` file
is located and enter the following command in the terminal.

```sh
$ npm install
```
## Environment variables setup

Ensure that environment variables are setup prior to starting development.  Copy the contents of the `.env.defaults` file into a `.env` file.

| Variable  | Description | Default |
|:---------:|:---------:|:---------:|
| UI_APP_PORT | Port number used for the application | 9000 |

## Start Development 

When starting Development run the following command.  All code changes made in the `src` directory will be watched and hot released to the current development server.

```sh
$ npm start
```

### Exit Development

In the terminal enter `ctrl + c` to end the process.

## Serve Application for testing

For non development the following command will run the server without watching for code changes.

```sh
$ npm run serve
```

## Generate Files for beta and release

Files will be generated into a folder called `/dist`

### Test server
```sh
$ npm run build:beta
```

### Production/Live server
```sh
$ npm run build:release
```

## Code Quality Check with Linting

Linting rules are located in the `package.json` file under `eslintConfig` and `stylelint`

both `JavaScript` and `CSS`

```sh
$ npm run lint
```

`JavaScript` only

```sh
$ npm run lint:js
```
- https://eslint.org/docs/rules/

`CSS` only

```sh
$ npm run lint:css
```
- https://stylelint.io/user-guide/rules/

> You can optionally add `--fix` to auto fix lint errors (`Recommended`)

## Code Quality Check with Unit Testing

All test will be added to the `/test/unit` folder from the root directory.  Be sure to end all test files with `spec.js`.

Example

> util.spec.js

Run Karma with Mocha/Chai/Sinon

```sh
$ npm run unit
```

** To run both lint and test use **

```sh
$ npm run test
```

## Code Quality Check with End to End Testing

Not yet implemented.  Possibly Puppeteer.

## OS Support

| Mac/Linux | Windows |
|:---------:|:---------:|
| &check; | &check; |

## Browser Support

| IE / Edge* | Firefox | Chrome | Safari | Opera | iOS | Android |
|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
| &Chi; | &check; | &check; | &check; | &Chi; | &check; | &check;

> *Parital support with a pollyfill(not recommended)

- https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements

## Wiki

- https://github.com/hingejs/generator/wiki

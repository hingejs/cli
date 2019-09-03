# &#8762; HingeJS - CLI Project Generator

Command line interface and Simple Single Page Application and code generator

> Most of the features have been implemented. This is a work in progress until a 1.0.0 release.

### What is this for?

This project generator creates a process to build web applications using web components in a single page application. The packaged services and custom elements are used to help make development easier. You can use any services or other custom element libraries.

### Is this just another framework?

Technically it is not.  The libraries used in development have little to no dependencies.  Custom Elements allow you to build reusable components using plain JavaScript only.  Long gone are the days of having to copy HTML/CSS/JS and manually insert them for one piece of functionality.  This is now done in one file and used as a custom HTML tag, native to the browser.

This generator sets you up so you have the following features available to you faster.

- Build/Bundle process
- CSS/JS linting
- Unit testing
- Web dev server
- HTML cached templates
- i18n translations
- Templates generated for rapid development

#### Wiki

For more information, tips and guides visit:

- https://github.com/hingejs/generator/wiki

#### Related packages
- https://www.npmjs.com/package/@hingejs/services
- https://www.npmjs.com/package/@hingejs/webcomponents

## Installation

Install this package globally

```sh
$ npm install @hingejs/generator -g
```

## Generate Project

> Please note:  You can always Internationalize your application later but it is recommended to do this from the beginning rather than updating during development. This CLI will not be able to do that for you so choose carefully from the start.

New project

```sh
$ hingejs new <projectFolderName>
```

> Alias `n`

```sh
$ hingejs n <projectFolderName>
```

example with project folder name 

```sh
$ hingejs new test
```

Options

| Command  | ShortCut | Description |
|:---------:|:---------:|:---------:|
| --i18n | -i | Internationalize the new project |
| --port <number> | -p | Integer argument ( Default: 9000) |

> Internationalization Info: https://developer.mozilla.org/en-US/docs/Glossary/I18N

Examples:

```sh
$ hingejs new test --i18n
```

```sh
$ hingejs new test --port 7500
```

```sh
$ hingejs new test --i18n --port 7500
```

Once generated you can run the following command to start the project
> You can refer to the project README.md file
```sh
$ cd <projectFolderName>
$ npm start
```

## Generate Files

New template file

```sh
$ hingejs generate <type>
```

> Alias `g`

```sh
$ hingejs g <type>
```

Examples:

```sh
$ hingejs generate component
$ hingejs generate element
$ hingejs generate feature
$ hingejs generate service

$ hingejs g c
$ hingejs g e
$ hingejs g f
$ hingejs g s
```

Types

| Command  | ShortCut | Description |
|:---------:|:---------:|:---------:|
| component | c | Components are project specific and have element/service dependencies |
| element | e | Custom elements should be built dependency free to be used for any project |
| feature | f | New route page for the application |
| service | s | Singleton/Observable based services to manage business logic |


Options

| Command  | ShortCut | Description |
|:---------:|:---------:|:---------:|
| --shadow | -s | Shadow dom for element |

### Generate File Names

#### Component and Elements
  Follows rules for w3c custom elements.  must start with an alpha character.  Can be alpha-numeric, but must contain one hyphen(-).

   > `tool-tip` to be used as `<tool-tip></tool-tip>`

```sh
$ hingejs generate component tool-tip
```
 
#### Services
  Must be lowercase with hyphen's(-) to separate words.

  > `todo` will become `TodoService`

  > `to-do` will become `ToDoService`

```sh
$ hingejs generate service to-do
```

Using a service in the application you can do the following.  Webpack is configured to resolve `'services'` as an alias to the correct path of `./src/services/index.js`.

```js
import { TodoService } from 'services'
```

#### Features
  Must be lowercase with directory separators(/).  This structure will be generated in the features folder.

  > `todo` will become `todo/todo.js`

  > `todo/home` will become `todo/home.js`

```sh
$ hingejs generate feature todo/home
```

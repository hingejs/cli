# &#8762; HingeJS - CLI Project Generator

Command line interface and Simple Single Page Application and code generator

> Most of the features have been implemented. This is a work in progress until a 1.0.0 release.

### What is this for?

This project generator creates a process to build web applications using web components.  It can be in a single page application or traditional page links. The packaged services and custom elements are used to help make development easier. You can use any services or other custom element libraries.

### Is this just another framework?

Technically it is not.  The libraries used in development have little to no dependencies.  Custom Elements allow you to build custom HTML tags using plain JavaScript only.  Long gone are the days of having to copy HTML/CSS/JS and manually insert them for one piece of functionality.  This is now done in one file and used as a custom HTML tag, native to the browser.


This generator sets you up so you have the following features available to you faster.

- Build/Bundle process
- Routing
- Services
- Web component suite
- CSS/JS linting
- Unit testing
- Web dev server
- HTML cached templates
- i18n translation process
- Templates generated for rapid development

### Why use this

**Very lightweight.**  The build process has dependencies but the core SPA JS bundled `dist` files are just a couple of helper services(with zero dependencies) and some baseline elements(with zero dependencies).  What you end up with is a purely native, low overhead application with the latest and greatest JS has to offer.  

To maintain the application the developer just needs to know JavaScript.  There is no extra process, custom or made-up design, just ES6+ JavaScript.

### Wiki

For more information, tips and guides visit:

- https://github.com/hingejs/generator/wiki

### Related packages

- https://www.npmjs.com/package/@hingejs/services
- https://www.npmjs.com/package/@hingejs/webcomponents

## Installation

Install this package globally

```sh
$ npm install @hingejs/generator -g
```

### Quick use guide

**Step 1** Generate a project in a folder called test

```sh
$ hingejs new test
```

> Replace `test` with any folder name of your choosing

**Step 2** Wait for the files to be copied and npm install to be completed

**Step 3** Enter the new project folder 
```sh
$ cd test
```

**Step 4** Run the command to start development
```sh
$ npm start
```


## Generate Project

New project

```sh
$ hingejs new <projectFolderName>
```
> Folder name must be lowercase and allows for alpha-numeric, slashes(/), dashes(-) and underscores(_) characters.

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

> Please note:  You can always Internationalize your application later but it is recommended to do this from the beginning rather than updating during development. This CLI will not be able to do that for you so choose carefully from the start.

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

**Once generated** you can run the following command to start the project

```sh
$ cd <projectFolderName>
$ npm start
```

> You can refer to the <projectFolderName> `README.md` file

## Generate Files

New template file

```sh
$ hingejs generate <type> <name>
```

> Alias `g`

```sh
$ hingejs g <type> <name>
```

Examples:

```sh
$ hingejs generate component <name>
$ hingejs generate element <name>
$ hingejs generate feature <name>
$ hingejs generate service <name>

$ hingejs g c <name>
$ hingejs g e <name>
$ hingejs g f <name>
$ hingejs g s <name>
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

example of option

```sh
$ hingejs generate element tool-tip --shadow
```

the shortcut command route

```sh
$ hingejs g e tool-tip -s
```


## Generate Name Rules

### Component and Elements
Follows rules for w3c custom elements.  Must begin with an alpha character.  Can be alpha-numeric, but must contain one hyphen(-).

```sh
$ hingejs generate component tool-tip
```
**or**

```sh
$ hingejs generate element tool-tip
```

 > `tool-tip` to be used as `<tool-tip></tool-tip>`
 
### Services
  Must be lowercase with hyphen's(-) to separate words.

```sh
$ hingejs generate service to-do
```

  > `todo` will become `TodoService`

  > `to-do` will become `ToDoService`

Using a service in the application you can do the following.  Webpack is configured to resolve `'services'` as an alias to the correct path of `./src/services/index.js`.

```js
import { TodoService } from 'services'
```

### Features
  Must be lowercase with directory separators(/).  This structure will be generated in the features folder.

```sh
$ hingejs generate feature todo/home
```

  > `todo` will become `todo/todo.js`

  > `todo/home` will become `todo/home.js`

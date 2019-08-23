# &#8762; HingeJS - CLI Project Generator

Command line interface

Simple Single Page Application and code generator

- https://github.com/hingejs/services#readme
- https://github.com/hingejs/webcomponents#readme

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

Component and Element
  Follows rules for w3c custom elements.  must start with an alpha character.  Can be alpha-numeric, but must contain one hyphen(-).
   > `tool-tip` to be used as `<tool-tip></tool-tip>`
```sh
$ hingejs generate component tool-tip
```
 

Services
  Must be lowercase with hyphen's(-) to separate words.
  > `todo` will become `TodoService`
  > `to-do` will become `ToDoService`
```sh
$ hingejs generate service to-do
```

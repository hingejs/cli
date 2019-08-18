# &#8762; HingeJS - CLI Project Generator

Command line interface

Simple Single Page Application and code generator

## Installation

Install this package globally

```sh
$ npm install @hingejs/generator -g
```

## Generate Project

> Please note:  You can always Internationalize you application but it is recommended to do this from the beginning rather than updating during development. This CLI will not be able to do that for you so choose carefully from the start.

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

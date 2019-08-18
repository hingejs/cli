# &#8762; HingeJS - CLI Project Generator

Command line interface

Simple Single Page Application and code generator

## Installation

The following software is required.

- https://nodejs.org/en/

> Note that when you install `node.js`, `npm` is also installed

| Node  | NPM | Git |
|:---------:|:---------:|:---------:|
|  v.8+ | v.5+ | &check; |

Once the repository is cloned go into the root folder where the `package.json` file
is located and enter the following command in the terminal.

```sh
$ npm install
```

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

All test will be added to the `test` folder from the root directory.  Be sure to end all test files with `spec.js`.

Karma and Mocha/Chai/Sinon

```sh
$ npm run test
```

## Code Quality Check with End to End Testing

Not yet implemented.  Possibly Puppeteer

## Browser Support

| IE / Edge | Firefox | Chrome | Safari | Opera | iOS | Android |
|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
| &Chi; | &Chi; | &check; | &check; | &Chi; | &check; | &check;


## Fix server redirects

### Apache 
`.htaccess` file
```sh
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule ^.*$ / [L,QSA]
```

### or 

```sh
RewriteEngine On
# set the base URL prefix
RewriteBase /
# for requests for index.html, just respond with the file
RewriteRule ^index\.html$ - [L]
# if requested path is not a valid filename, continue rewrite
RewriteCond %{REQUEST_FILENAME} !-f
# if requested path is not a valid directory, continue rewrite
RewriteCond %{REQUEST_FILENAME} !-d
# if you have continue to here, respond with index.html
RewriteRule . /index.html [L]
```
### 404.html

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">        
    </head>
    <body>
        <script> window.location.replace(window.location.origin) </script>
    </body>
</html>
```
### Express Node.js

```js
const express = require('express')
const app = express()
const port = process.env.port || 7600
const root = __dirname

const fallback = (...pathOptions) => (req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
    res.sendFile.call(res, ...pathOptions, error => error && next())
  } else next()
}

app.use(express.static(root))
app.use(fallback('index.html', { root }))

let httpInstance = app.listen(port)

process.on('SIGINT', () => {
  console.log('gracefully shutting down')
  httpInstance.close()
  process.exit(0)
})
```

## Development

- Routing
- Service Layer
- Feature Folders
- Assets
- Custom Elements (Shared Widgets)
- Template Caching


#### Routing Path

All routing paths are absolute but a parameter can be added with a colon `:`.

```js
RouterService
  .setPath('/alerts/:id', alertController)
  .setPath('/alerts/:id?', alertControllerOptional)
  .setPath('/alerts/:id/warn/:status?', alertWarnControllerOptional)
```

> Adding a question mark `?` will make the param optional.

The `req` object will have a `new Map()` named `params` that will have the the values found from the url.

```js
const homeController = (req, next) => {
  req.params.get('id')
  req.params.get('status')
  next()
}
```

### Service Layer

Use the file `./src/services/template.service.js` as a starter file to create services.  Not all services are shared and need to be put into the `./src/services` folder. They can be placed in the feature folder. Two helper files `observables.js` and `http-fetch.js` can use used with these services.

- All business logic should be placed in a service
- Services should mainly be a `singleton`
- Services can be placed in a `Feature Folder` if not used by multiple files

### Assets

This is where images, documents etc. will go and be referenced. The folder `assets` can be found in the root directory.

### Feature Folders

Feature folders will group all coding content related to that feature. These folders should be created in the `./src/features` folder.

An arrivals feature might include the `.html` page, the `.css` file and any `.js` files such as services, helper or any related files.  It must include an `index.js` file that will be used to import all files and logic needed for that feature.

Once completed the `index.js` file should be imported to the `./src/main.js` file.

- The `.html` file must be unique for the `Template/HTML Caching`

### Template Caching

All html pages in the feature folder, excluding the `index.html` will be copied into a file called `html-cache.js`. This file is to be used to load in the html to the `<router-display>`

- Note that the `index.html` is the main layout
- Avoid JavaScript logic in the html files

### Custom Elements (Shared Widgets)

Custom elements are found in `./src/widgets` and are shared throughout the app.  These are custom HTML tags created for reusability.

> At the moment shadow dom's use is to be limited due to browser support for allowing override styles.

### Debugging tricks

- console.trace()
- console.table()
- console.dir()

### Testing for XSS Attacks

you can use the following code with innerHTML to ensure the output is secure

```html
 <img src=x onerror="alert('XSS Attack')">
```

Use case

```html
<body>
  <div id="app"></div>
  <script>
    const app = document.querySelector('#app')
    app.innerHTML = '<img src=x onerror="alert(\'XSS Attack\')">'
  </script>
</body>
```

Remedy

### Alternatives to innerHTML

If there is no need for innerHTML you can do the following

```js
const element = document.querySelector('div')
element.firstChild.nodeValue = '<strong>value</strong>'
// or
element.textContent = '<strong>value</strong>'
```


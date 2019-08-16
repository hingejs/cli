# Intelligence of Things Front-end Command-line Interface

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

Not yet implemented.  Will require Karma and Jasmine for BBD

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
> https://www.npmjs.com/package/forever can be used to run the server incase of crashes

## Development

### Routing

Whats needed
- Create an html file with the HTML to display (optional)
- Add a link to the page with `<route-link>`
- Listen for the link and pipe functions to control what should happen 


Routing is based on `history API` and does not use a hash fallback.

For links to change the url use the custom element `<route-link>`

```html
<route-link data-route="home" data-title="Home Page">Home</route-link>
```
The browser url will change to `http://localhost:9000/home` when clicked on.

> Route params will be supported soon e.g.  `data-route="home/:id`

To handle these changes in JavaScript the `RouterService` class

```js
import { RouterService } from './route/index.js'

const homeControler = (req, next) => {
  req.load('default')
  next()
}

RouterService
  .setPath('/home', homeControler)
  .setPath('/about', aboutCallbackFunction)
```
> The `req.load` function will set the custom element  `<route-display>` with the html data.

The html file named `default.html` will be saved with the key 'default' in a file called `templateCache.js`


- Service Layer
- Feature Folders
- Assets
- Custom Elements (Shared Widgets)
- Template Caching

### Debuging tricks

 - console.trace()
 - console.table()
 - console.dir()

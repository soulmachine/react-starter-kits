This repo is a tutorial about how to build a react starter kit step by step.

All starter kits in this tutorial use ES6 by default.

Table of Contents
-----------------
1. [Kit1](#1-kit1-reactbabelwebpack)
1. [Kit2](#2-kit2-kit1--webpack-dev-server--eslint)
1. [Kit3](#3-kit3-kit2--redux)
1. [Kit4](#4-kit4-kit3--react-router)


# 1 Kit1: React+Babel+Webpack

First, make an empty project by running `npm init`, and enter the following information:

    mkdir kit1 && cd kit1
    npm init
    
    name: (kit1) react-starter-kit
    version: (1.0.0) 
    description: A React starter kit
    entry point: (index.js) src/main.jsx
    test command: 
    git repository: 
    keywords: es6,react,babel6,webpack,boilerplate
    author: soulmachine
    license: (ISC) MIT

It will generate a file `package.json`:

```json
{
  "name": "react-starter-kit",
  "version": "1.0.0",
  "description": "A React starter kit",
  "main": "src/main.jsx",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "es6",
    "react",
    "babel6",
    "webpack",
    "boilerplate"
  ],
  "author": "soulmachine",
  "license": "MIT"
}
```

## 1.1 Install React

    npm install --save react react-dom

## 1.2 Install Babel 6

Babel 6 changes drastically compared with Babel 5. Every transform is now a plugin, including ES2015 and JSX. Stage 0 is now a separate preset, not an option(used to be `stage: 0` in `.babelrc` in babel 5.x). So we need to install them addtionally.

	npm install --save-dev babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-0

**Runtime support**

Babel can’t support all of ES6 with compilation alone — it also requires some runtime support. In particular, the new ES6 built-ins like Set, Map and Promise must be polyfilled, and Babel’s generator implementation also uses a number of runtime helpers.

    npm install --save babel-polyfill

Babel also bakes a number of smaller helpers directly into your compiled code(used to be `--external-helpers` option in Babel 5.x). This is OK for single files, but when bundling with Webpack, repeated code will result in heavier file size. It is possible to replace these helpers with calls to the `babel-runtime` package by adding the `transform-runtime` plugin:

    npm install --save babel-runtime
    npm install --save-dev babel-plugin-transform-runtime

Reference: 

+ [6.0.0 Released](http://babeljs.io/blog/2015/10/29/6.0.0/)
+ <http://babeljs.io/docs/setup/>
+ [The Six Things You Need To Know About Babel 6](http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6/)
+ [Using ES6 and ES7 in the Browser, with Babel 6 and Webpack](http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/)

## 1.3 Install Webpack

For those who don't know what webpack is, please read [this tutorial](https://github.com/ruanyf/webpack-demos).

    npm install --save-dev webpack

Install essential webpack loaders(What is loader? See [official docs here](https://webpack.github.io/docs/loaders.html)):

    npm install --save-dev babel-loader css-loader style-loader url-loader 

Add these loaders to `webpack.config.js`:

```javascript
module: {
  loaders: [
	{ 
	  test: /\.css$/, 
	  include: path.resolve(__dirname, 'src'),
	  loader: 'style-loader!css-loader?modules' 
	},
    {
      test: /\.jsx?$/,
	  include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'react', 'stage-0']
      }
    },
	{ 
	  test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }
  ]
}
```

Babel requires some helper code to be run before your application. To achieve this, add the `babel-polyfill` to the `entry` section. 

Finally we have a complete `webpack.config.js`:

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/main.jsx')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader?modules'
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
```

## 1.4 Write our code

See the code in `kit1/src` directory.

## 1.5 Compile and run

Add a subcommand `build` to the `scripts` section of `package.json`,

    "build": "webpack",

Compile the whole project,

    npm run build

It will generate a file `bundle.js` in `build/` directory.

Copy the `index.html` to `build/`,

    cp src/index.html build/
    
Open `build/index.html` in a browser, you'll see it!

How to copy `index.html` to `build/` automatically? There is a way, let's do it.

Install the loader `file-loader`,

    npm install --save-dev file-loader
    
In `main.jsx` file add a require to `index.html` via `file-loader`,

    require('file?name=[name].[ext]!./index.html');


# 2 Kit2: Kit1 + webpack-dev-server + ESLint

We're going to use more features of webpack, to make the development workflow more powerful.

## 2.1 webpack-dev-server

The [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) is a little node.js Express server serve static files. 

    npm install --save-dev webpack-dev-server

Add a subcommand `start` in `scripts` section of `package.json`:

    "start": "webpack-dev-server --inline --devtool eval --progress --colors --content-base build",

Add a line to the `entry` section of `webpack.config.js`:

    'webpack-dev-server/client?http://localhost:8080',

And configure `webpack-dev-server` by adding a `devServer` field in `webpack.config.js`:

```javascript
devServer: {
  inline: true,
  progress: true,
  contentBase: './build',
  port: 8080
},
```

Now run `npm run start` and open <http://localhost:8080> in a browser.

## 2.2 open-browser-webpack-plugin

[open-browser-webpack-plugin](https://github.com/baldore/open-browser-webpack-plugin) opens a new browser tab when Webpack loads. Very useful if you're lazy and don't want to force yourself to open a new tab when Webpack is ready to play!

    npm install --save-dev open-browser-webpack-plugin

Add require to this plugin and add a new instance to the `plugins` field of `webpack.config.js`:

```javascript
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// ...
plugins: [
  new OpenBrowserPlugin({ url: 'http://localhost:8080' })
]
```

Now build the project again and run `npm run start` you'll find that the the browser opens <http://localhost:8080> automatically.

    rm -rf build
    npm run start

## 2.3 Hot Module Replacement

[Hot Module Replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) (HMR) exchanges, adds, or removes modules while an application is running **without a page reload**.

You have [two ways](http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement) to enable Hot Module Replacement with the webpack-dev-server.

1. Specify `--hot` and `--inline` in the command line

        $ webpack-dev-server --hot --inline

2. Modify` webpack.config.js`.

    + Add `inline: true` and `hot: true` to the `devServer` field
    + add `new webpack.HotModuleReplacementPlugin()` to the `plugins` field
    + add `webpack/hot/dev-server` and `webpack-dev-server/client?http://localhost:8080` to the `entry` field

## 2.4 ESLint and Airbnb's ESLint config

Install:

    npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-react

Add `.eslintrc`:

```json
{
  "env": {
    "node": true
  },
  ecmaFeatures: {
    jsx: true
  },
  "globals": {
    "React": true
  },
  "plugins": [
    "react"
  ],
  "extends": "airbnb",
  "rules": {
    "comma-dangle": 0,
    "no-console": 0,
    "id-length": 0,
    "react/prop-types": 0
  }
}
```

Add `.eslintignore`:

    build/**
    node_modules/**
    **/*.css
    **/*.html

Add a subcommand `lint` to the `scripts` field of `webpack.config.js`:

    "lint": "eslint 'src/**/*.@(js|jsx)'",

Run `npm run lint` to lint all source code.

Add eslint to git pre-commit hook, this way you will never commit in code that doesn't pass a check.

    npm install --save-dev precommit-hook

In addition to the `precommit-hook` package, this command will also 

+ adds two files `.jshintrc` and `.jshintignore` to current project
+ adds a `pre-commit` field to `package.json`
+ adds two subcommands `lint` and `validate` to the `scripts` field if none exist

The `lint` subcommand in `scripts` uses `eslint` instead of `jshint`, which means this starter kit doesn't use jshint at all, and this is true. 

Since eslint supports ES6 while jshint only has partial support for ES6, the obvious choice is eslint.

Delete two files `.jshintrc` and `.jshintignore`:

    rm .jshint*

Actually this starter kit is almost the same as [ruanyf/react-babel-webpack-boilerplate](https://github.com/ruanyf/react-babel-webpack-boilerplate).

Reference:

+ [5-step quick start guide to ESLint](http://codeutopia.net/docs/eslint/)
+ [A Comparison of JavaScript Linting Tools](http://www.sitepoint.com/comparison-javascript-linting-tools/)
+ [ruanyf/react-babel-webpack-boilerplate](https://github.com/ruanyf/react-babel-webpack-boilerplate)
+ [ruanyf/webpack-demos](https://github.com/ruanyf/webpack-demos)
+ [petehunt/webpack-howto](https://github.com/petehunt/webpack-howto)

# 3 Kit3: Kit2 + Redux

Install Redux related packages,

    npm install --save redux react-redux redux-thunk

Let's write a simple component named `Counter`, which is almost the same with the official example, [redux/examples/counter/](https://github.com/rackt/redux/tree/master/examples/counter).

Copy four directories `actions`, `components`, `containers`, `reducers` from the official counter example to our `src` directory.

Rename `component/Counter.js` to `component/Counter.jsx`, `containers/App.js` to `containers/Counter.js`

In `containers/Counter.js` change the line `import Counter from '../components/Counter'` to `import Counter from '../components/Counter.jsx'`.

In `components/App.jsx`, add the `Counter` component:

```javascript
import Counter from '../containers/Counter'
//...

render() {
  return (
    <div>
      <h1>Hello World</h1>
      <Counter />
    </div>
  )
}
```

In `main.jsx` we create a `store` and make the `Provider` as the root component:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
require('file?name=[name].[ext]!./index.html')

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

const store = createStoreWithMiddleware(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
```

Compile and run:

    npm install
    npm run build
    npm run start

It will open in a browser automatically.

References:

+ [Full-Stack Redux Tutorial - Tero Parviainen](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
+ [happypoulp/redux-tutorial](https://github.com/happypoulp/redux-tutorial)
+ [redux/examples/counter/](https://github.com/rackt/redux/tree/master/examples/counter)


# 4 Kit4: Kit3 + react-router

## 4.1 Use react-router

Now the text `Hello World` and `Counter` component huddle together in one page, which looks ugly, how about split them into separate pages?

We want the `Hello World` text to be displayed at the home URL '/' and the counter at '/counter'. Here react-router comes to help.

Install react-router,

    npm install history@1.13.1 react-router@latest

Do use `history@1.13.1`, see official docs [Release v1.0.2](https://github.com/rackt/react-router/releases/tag/v1.0.2):

> Please ensure your project is running history v1.13.1 to avoid any deprecation warnings or unmet peerDependencies errors.


Creat a `Header` component, which is a stateless component:

```javascript
import React from 'react'
import {Link} from 'react-router'

export default () =>
  <div>
    <Link to="/">Home</Link>
    {' '}
    <Link to="counter">Counter</Link>
  </div>
```

Split `components/App.jsx` to two files, `App.jsx` and `HelloWorld.jsx`.

`App.jsx`:

```javascript
import React from 'react'
import Header from './Header.jsx'

export default (props) =>
  <div>
    <Header/>
    {props.children}
  </div>
```

`HelloWorld.jsx`:

```javascript
import React from 'react'
require('./HelloWorld.css')

export default () =>
  <h1>Hello World</h1>
```

Rename the file `App.css` to `HelloWorld.css`.

Create a new file `src/routes.jsx`:

```javascript
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App.jsx'
import HelloWorld from './components/HelloWorld.jsx'
import Counter from './containers/Counter'

const routes =
  <Route path="/" component={App}>
    <IndexRoute component={HelloWorld} />
    <Route path="counter" component={Counter} />
  </Route>

export default routes
```

Make `Router` as the root component in `main.jsx`:

```javascript
import routes from './routes.jsx'
import Router from 'react-router'
//...
ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)
```

Compile and Run,

    npm install
    npm start

Everything works!

## 4.2 Remove `#` in URLs

You'll see a `#` in all URLs, this is because react-router uses `createHashHistory` by default.

Normally we want URLs <http://www.example.com/about> instead of <http://www.example.com/#/about>, how to achive this? Use `createBrowserHistory`.

Modify `main.jsx` a little bit:

```javascript
import createBrowserHistory from 'history/lib/createBrowserHistory'
//...

<Router history={createBrowserHistory()}>{routes}</Router>
```

Run `npm start` and take a look in browser. Looks Good!

But wait. When you refresh the page <http://localhost:8080/counter> it will return error. It seems you can only visit the counter page by clicking the link, why?

Why? Because for now react-router only works in browser, when you click fresh or hit enter on the browser address bar the request will be sent to server. In our web app we only have a simple express server bundled in `webpack-dev-server`, which doesn't understand the URL <http://localhost:8080/counter> at all. How to make our server understand URLs? There are several options:

+ run react-router at server-side
+ always return `index.html` and leave all work to client-side react-router

To keep our web app simple, we'll use the second way:

+ In development phase, make `webpack-dev-server` always return `index.html`
+ In deploy phase, make our HTTP server such as Nignx always return `index.html`

Add a line `historyApiFallback: true,` to the `devServer` field of `webpack.config.js`, then run `npm start` again and refresh at <http://localhost:8080/counter> or enter it directly in browser address bar, you'll see everything works!



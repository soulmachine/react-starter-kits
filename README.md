This repo is a tutorial about how to build a react starter kit step by step.

All starter kits in this tutorial use ES6 by default.

Table of Contents
-----------------
1. [Step1: React+Babel+Webpack](#1-step1-create-react-app)
1. [Step2: Step1 + MobX](#2-step2-step1--mobx)


# 1 Step1: create-react-app

Create an empty project via [create-react-app](https://github.com/facebookincubator/create-react-app),

    create-react-app step1
    cd step1
    npm start
    

`create-react-app` can help you automate the build of your app. There is no configuration file, and `react-scripts` is the only extra build dependency in your `package.json`. Your environment will have everything you need to build a modern React app:

* [webpack](https://webpack.github.io/) with [webpack-dev-server](https://github.com/webpack/webpack-dev-server), [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) and [style-loader](https://github.com/webpack/style-loader)
* [Babel](http://babeljs.io/) with ES6 and extensions used by Facebook (JSX, [object spread](https://github.com/sebmarkbage/ecmascript-rest-spread/commits/master), [class properties](https://github.com/jeffmo/es-class-public-fields))
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [ESLint](http://eslint.org/)
* [Jest](http://facebook.github.io/jest)
* and others.


# 2 Step2: Step1 + MobX

MobX relies on decorator syntax heavily, but Babel 6 doesn't support decoraors and `create-react-app` is not configurable, there is no way to add support for decorators. However, according to this stackoverflow post [Using MobX observable decorators with create-react-app](http://stackoverflow.com/questions/39262103/using-mobx-observable-decorators-with-create-react-app),  there are a few solutions:

* use MobX without decorators, therefore your code  becomes verbose
* [create-react-app-mobx](https://github.com/mobxjs/create-react-app-mobx/), only works for `create-react-app@0.2.0`
* add the `transform-decorators-legacy` yourself in `node_modules/react-scripts/config/babel.dev.js`
* [custom-react-scripts](https://github.com/kitze/create-react-app), there's a nice [medium article](https://medium.com/@kitze/configure-create-react-app-without-ejecting-d8450e96196a#.1m4snh6b0) explaining the ideas behind it.

We're going to use the forth way, because it's more flexible and not intrusive.

Create an empty project with `custom-react-scripts`

    create-react-app step2 --scripts-version custom-react-scripts
    cd step2
    npm start

Create an `.env` file which has the following lines:

    REACT_APP_LESS=true
    REACT_APP_CSS_MODULES=true
    REACT_APP_DECORATORS=true


and delete two css files, `src/App.scss` and `src/App.styl`, also, delete two lines in `App.js` that refer to them.


Install `mobx` and `mobx-react`,

    npm install --save mobx mobx-react

Next we're going to use MobX to write a `Counter` component, just for learning purpose.

Create a file `src/components/Counter.js`,

```javascript
import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

@observer class Counter extends Component {
  handleInc = () => {
    this.props.store.increment();
  };

  handleDec = () => {
    this.props.store.decrement(); 
  };

  handleIncAsync = () => {
    this.props.store.incrementAsync();
  };

  render() {
    return (
      <div>
        Counter: {this.props.store.count} {'  '}
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDec}> - </button>
        <button onClick={this.handleIncAsync}> Increment async </button>
      </div>
    );
  }
}

export default Counter;
```

Create a file `src/stores/CounterStore.js`,

```javascript
import { observable, action, useStrict, runInAction } from 'mobx';

useStrict(true);

export default class CounterStore {
  @observable count = 0;

  @action increment() {
    this.count++;
  }

  @action decrement() {
    this.count--;
  }

  @action incrementAsync() {
    setTimeout(() => {
      runInAction('Timeout increment', () => { this.count++; }, this);
    }, 1000);
  }
}
```

Modify the content of `src/App.js` to the following:

```javascript
import React, {Component} from 'react';
import Counter from './components/Counter';
import CounterStore from './stores/CounterStore';

//styles
import './App.less';
import styles from './Modules.css';

class App extends Component {
  render() {
    const counterStore = new CounterStore();
    return (
      <Counter store={ counterStore } />
    )
  }
}

export default App;
```

Run `npm start` to compile and open the browser to see the real effect.


This repo is a tutorial about how to build a react starter kit step by step.

All starter kits in this tutorial use ES6 by default.

Table of Contents
-----------------
1. [Step1: create-react-app](#1-step1-create-react-app)
1. [Step2: Step1 + Redux](#2-step2-step1--redux)


# 1 Step1: create-react-app

Create an empty project via [create-react-app](https://github.com/facebookincubator/create-react-app),

    npm install -g create-react-app
    
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

## `npm test`

Runs the test watcher in an interactive mode.

## `npm run build`

Builds the app for production to the `build` folder.


# 2 Step2: Step1 + Redux

Install Redux related packages,

    npm install --save redux react-redux redux-thunk

Let's write a simple component named `Counter`, which is almost the same with the official example, [redux/examples/counter/](https://github.com/reactjs/redux/tree/master/examples/counter).

Create a dump component, `src/components/Counter.js`,

```jsx
import React from 'react'

const Counter = ({ increment, incrementIfOdd, incrementAsync, decrement, counter }) =>
  <div>
    Clicked: {counter} times
    {' '}
    <button onClick={increment}>+</button>
    {' '}
    <button onClick={decrement}>-</button>
    {' '}
    <button onClick={incrementIfOdd}>Increment if odd</button>
    {' '}
    <button onClick={() => incrementAsync()}>Increment async</button>
  </div>

Counter.propTypes = {
  increment: React.PropTypes.func.isRequired,
  incrementIfOdd: React.PropTypes.func.isRequired,
  incrementAsync: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
  counter: React.PropTypes.number.isRequired
}

export default Counter
```

Create a smart component, `src/containers/Counter.js`,

```javascript
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter.jsx'
import * as CounterActions from '../actions/counter'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

Create the reducer, `src/reducers/couter.js`,

```javascript
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter'

export default function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1
    case DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}
```

Create the root reducer, `src/reducers/index.js`,

```javascript
import { combineReducers } from 'redux'
import counter from './counter'

const rootReducer = combineReducers({
  counter
})

export default rootReducer
```

Create actions for the `Counter` component, `src/actions/counter.js`,

```javascript
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState()

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}
```

Create the store, `src/store/configureStore.js`,

```javascript
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
  // Middleware you want to use in development:
  applyMiddleware(thunk),
)

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default) // eslint-disable-line
    })
  }

  return store
}
```

References:

* [Full-Stack Redux Tutorial - Tero Parviainen](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
* [happypoulp/redux-tutorial](https://github.com/happypoulp/redux-tutorial)
* [Redux Counter Example](https://github.com/reactjs/redux/tree/master/examples/counter)
* [Container Components](https://medium.com/@learnreact/container-components-c0e67432e005#.sd66r3cj6)
* [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.9esqxa1km)
* [container vs component?](https://github.com/rackt/redux/issues/756)
* [React 0.14：揭秘局部组件状态陷阱](http://zhuanlan.zhihu.com/FrontendMagazine/20416954)

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import { Router, browserHistory } from 'react-router'
require('file?name=[name].[ext]!./index.html') // eslint-disable-line
require('file?name=[name].[ext]!./main.css') // eslint-disable-line

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

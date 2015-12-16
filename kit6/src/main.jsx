import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import Router from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
require('file?name=[name].[ext]!./index.html')

const injectTapEventPlugin = require('react-tap-event-plugin')
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

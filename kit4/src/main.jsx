import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import Router from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
require('file?name=[name].[ext]!./index.html')

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import { Router, browserHistory } from 'react-router'
require('file?name=[name].[ext]!./index.html') // eslint-disable-line
require('file?name=[name].[ext]!./main.css') // eslint-disable-line

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

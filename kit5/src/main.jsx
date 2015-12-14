import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import routes from './routes.jsx'
import Router from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
require('file?name=[name].[ext]!./index.html')

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

const store = createStoreWithMiddleware(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)

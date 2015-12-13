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

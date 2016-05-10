import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
require('file?name=[name].[ext]!./index.html') // eslint-disable-line
require('file?name=[name].[ext]!./main.css') // eslint-disable-line

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

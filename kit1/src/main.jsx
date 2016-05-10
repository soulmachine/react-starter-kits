import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
require('file?name=[name].[ext]!./index.html') // eslint-disable-line
require('file?name=[name].[ext]!./main.css') // eslint-disable-line

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

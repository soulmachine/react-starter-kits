import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
require('file?name=[name].[ext]!./index.html');

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

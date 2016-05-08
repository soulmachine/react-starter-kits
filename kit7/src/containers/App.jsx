import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from '../components/Header'
import DevTools from './DevTools'

export default (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <Header />
      {props.children}
      <DevTools />
    </div>
  </MuiThemeProvider>
)

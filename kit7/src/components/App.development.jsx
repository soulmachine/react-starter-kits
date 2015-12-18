import React from 'react'
import Header from './Header'
import DevTools from '../containers/DevTools'

export default (props) =>
  <div>
    <Header/>
    {props.children}
    <DevTools/>
  </div>

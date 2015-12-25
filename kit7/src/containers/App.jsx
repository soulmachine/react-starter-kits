import React from 'react'
import Header from '../components/Header'
import DevTools from './DevTools'

export default (props) =>
  <div>
    <Header/>
    {props.children}
    <DevTools/>
  </div>

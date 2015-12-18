import React from 'react'
import Header from './Header'

export default (props) =>
  <div>
    <Header/>
    {props.children}
  </div>

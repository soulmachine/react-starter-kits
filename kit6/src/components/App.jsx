import React from 'react'
import Header from './Header.jsx'

export default (props) =>
  <div>
    <Header/>
    {props.children}
  </div>

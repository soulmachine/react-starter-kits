import React from 'react'
import Header from '../components/Header'

export default (props) =>
  <div>
    <Header/>
    {props.children}
  </div>

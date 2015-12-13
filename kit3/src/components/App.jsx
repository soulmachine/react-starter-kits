import React from 'react'
import Counter from '../containers/Counter'
require('./App.css')

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <Counter />
      </div>
    )
  }
}

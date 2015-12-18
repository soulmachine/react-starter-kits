import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import HelloWorld from './components/HelloWorld'
import Counter from './containers/Counter'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HelloWorld} />
    <Route path="counter" component={Counter} />
  </Route>
)

export default routes

import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PagesProdutos from './Produtos/Produtos'

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={PagesProdutos} />
      </Switch>
    </Router>
  )
}

export default Root

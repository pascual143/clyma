import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'
import './style.scss'

import ProductsIndex from './components/products/ProductsIndex'
import ProductsNew from './components/products/ProductsNew'
import ProductsEdit from './components/products/ProductsEdit'
import ProductsShow from './components/products/ProductsShow'

import BusinessesIndex from './components/businesses/businessesIndex'
import BusinessesNew from './components/businesses/businessesNew'
import BusinessesEdit from './components/businesses/businessesEdit'
import BusinessesShow from './components/businesses/businessShow'

import SecureRoute from './components/common/SecureRoute'

import Register from './components/auth/Register'
import Login from './components/auth/Login'


import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'
import FlashMessages from './components/common/FlashMessages'

class App extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <FlashMessages />
          <Switch>
            <SecureRoute path="/products/new" component={ProductsNew} />
            <SecureRoute path="/products/:id/edit" component={ProductsEdit} />
            <Route path="/products/:id" component={ProductsShow} />
            <Route path="/products" component={ProductsIndex} />
            <SecureRoute path="/businesses/new" component={BusinessesNew} />
            <SecureRoute path="/businesses/:id/edit" component={BusinessesEdit} />
            <Route path="/businesses/:id" component={BusinessesShow} />
            <Route path="/businesses" component={BusinessesIndex} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

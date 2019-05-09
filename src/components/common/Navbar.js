import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      clickedIcon: false
    }

    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.toggleIcon = this.toggleIcon.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  toggleIcon() {
    this.setState({clickedIcon: !this.state.clickedIcon})
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.setState({ navbarOpen: false })
    }
  }

  render() {

    return (
      <nav className= {this.props.location.pathname === '/' ? 'navbar home' : 'navbar is-green'}>
        <div className="container">
          <div className="navbar-brand">
            <Link
              className="navbar-item"
              onClick={this.toggleIcon} to="/"
            >
              <strong className="has-text-dark is-size-4">
              CLYMA
              </strong>
            </Link>
            <a
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-item has-dropdown is-hoverable navbar-start">

              <div className="navbar-dropdown">
                <Link to="/products" className="navbar-item has-text-black">
                Products
                </Link>
                <hr className="navbar-divider" />
                <Link to="/businesses" className="navbar-item has-text-black">
                Companies
                </Link>
              </div>
            </div>
          </div>
          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              {Auth.isAuthenticated() &&
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link has-text-black">
                 Add
                </a>
                <div className="navbar-dropdown">
                  <Link to="/products/new" className="navbar-item has-text-black">
                   All Products
                  </Link>
                  <hr className="navbar-divider" />
                  <Link to="/businesses/new" className="navbar-item has-text-black">
                   Company
                  </Link>
                </div>
              </div>}

              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-gray" to="/register">Sign Up</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item has-text-gray" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item has-text-black" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)

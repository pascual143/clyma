import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import {Link} from 'react-router-dom'

class BusinessesShow extends React.Component {
  constructor(){
    super()

    this.state = {
      business: null,
      data: {}
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(){
    axios
      .delete(`/api/businesses/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        this.props.history.push('/businesses')
      })
      .catch(err => console.log(err))
  }


  componentDidMount() {
    axios.get(`/api/businesses/${this.props.match.params.id}`)
      .then(res => this.setState({ business: res.data }))

  }

  render(){
    if(!this.state.business) return null
    const { id, name, image, description, products } = this.state.business
    // console.log(product)
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1 is-title-light"> {name} </h1>
          <hr />
          <div className="columns is-variable is-5">
            <div className="column">
              <figure className="image">
                <img src={image} alt={name} />
              </figure>
            </div>
            <div className="column">
              <div className="content">
                <h4 className="title is-4">Description:</h4>
                <p> {description}</p>
                <h4 className="title is-4">Products:</h4>
                <div>
                  {products.map((product, index) =>
                    <Link to={`/products/${product.id}`} className="button pill is-rounded" key={index}> {product.name}  </Link>
                  )}
                  <hr/>
                </div>
                {Auth.isAuthenticated() && (
                  <div >
                    <Link to={`/businesses/${id}/edit`} className="button is-dark is-rounded">Edit </Link>
                    <button className="button is-dark is-rounded" onClick={this.handleDelete}> Delete </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <hr />
          <div className="columns is-variable is-5">
            <div className="column">
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BusinessesShow

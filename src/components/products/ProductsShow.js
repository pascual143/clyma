import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import {Link} from 'react-router-dom'

class ProductsShow extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {},
      product: null,
      message: 'alo',
      category: 'Food and Beverage'
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(){
    axios
      .delete(`/api/products/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => {
        this.props.history.push('/products')
      })
      .catch(err => console.log(err))
  }



  componentDidMount() {
    axios.get(`/api/products/${this.props.match.params.id}`)
      .then(res => this.setState({ product: res.data }))
      .then(() => console.log(this.state))


  }

  render(){
    if(!this.state.product) {
      console.log('this.state.product', this.state.product)
      return null

    }
    console.log('this.state.product', this.state)
    const { id, name, image, category, description, business, emmisions, energy } = this.state.product
    // console.log(business)
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-1 is-title-light"> {name} </h1>
          <hr />
          <div className="columns is-variable is-5">
            <div className="column">
              <figure className="image is-4by2">
                <img src={image} alt={name} />
              </figure>
            </div>
            <div className="column">
              <div className="content">
                <h4 className="title is-4">Category: <span className='subtitle is-6'> {category}</span></h4>
                <h4 className="title is-4">business: </h4>
                <Link to={`/businesses/${business.id}`} className="button pill is-rounded" key={business.id}> {business.name} </Link>
                <h4 className="title is-4">Description:</h4>
                <p> {description}</p>
                <h4 className="title is-4">Emmisions:</h4>
                <p> {emmisions}</p>
                <h4 className="title is-4">Energy:</h4>
                <p> {energy}</p>
                <hr/>
                {Auth.isAuthenticated() && (
                  <div>
                    <Link to={`/businesses/${id}/edit`} className="button is-dark is-rounded"> Edit </Link>
                    <button className="button is-dark is-rounded" onClick={this.handleDelete}> Delete </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ProductsShow

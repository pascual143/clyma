import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'
import ProductsForm from './ProductsForm'

class ProductsNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        name: '',
        image: '',
        emision: '',
        energy: ''
      },
      errors: ''
    }

    this.handleChange = this.handleChange(this)
    this.suggestionSelect = this.suggestionSelect(this)
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors }) 
  }


  handleSubmit(e) {
    e.preventDefault()
    axios
      .post('/api/products', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/products'))
      .catch((err) => {
        return this.setState({errors: err.response.data})
      })
  }

  render() {
    return(
      <div className="section">
        <h3 className="title has-text-centered">Product</h3>
        <ProductsForm
          name='business'
          data={this.state.data}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}

        />
      </div>
    )
  }
}

export default ProductsNew

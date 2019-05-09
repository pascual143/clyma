import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import ProductsForm from './ProductsForm'


class ProductsEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        id: '',
        name: '',
        image: '',
        emisions: '',
        energy: ''

      },
      errors: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.suggestionSelect = this.suggestionSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors })
  }


  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.data)
    axios
      .put(`/api/products/${this.props.match.params.id}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/products'))
      .catch((err) => this.setState({errors: err.response.data}))
  }

  componentDidMount(){
    axios
      .get(`/api/products/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
  }

  render() {
    return(
      <div className="section">
        <h3 className="title has-text-centered">Edit Product</h3>
        <ProductsForm
          name='form'
          data={this.state.data}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          suggestionSelect={this.suggestionSelect}
        />
      </div>
    )
  }
}

export default ProductsEdit

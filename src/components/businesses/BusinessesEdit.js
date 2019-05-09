import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import BusinessesForm from './BusinessesForm'

class BusinessesEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: ''
    }

    this.handleChange = this.handleChange
    this.suggestionSelect = this.suggestionSelect
    this.handleSubmit = this.handleSubmit
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
      .put(`/api/businesses/${this.props.match.params.id}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/businesses'))
      .catch((err) => this.setState({errors: err.response.data}))
  }

  componentDidMount() {
    axios
      .get(`/api/businesses/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))

    axios.get('/api/products')
      .then(res => {
        const options = res.data.map(product => {
          return {'value': product.id, 'label': product.name}
        })
        this.setState({ options })
      })
  }

  render() {
    return(
      <div className="section">
        <h3 className="title has-text-centered">Edit The Business</h3>
        <BusinessesForm
          name='business'
          data={this.state.data}
          errors={this.state.errors}
          options = {this.state.options}
          handleChange={this.handleChange}
          suggestionSelect={this.suggestionSelect}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default BusinessesEdit

import React from 'react'
import axios from 'axios'

import Auth from '../../lib/Auth'

import BusinessesForm from './BusinessesForm'



class BusinessesNew extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      errors: ''
    }

    console.log('this.props', this.state.data)

    this.handleChange = this.handleChange(this)
    this.handleSubmit = this.handleSubmit(this)
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
      .post('/api/businesses', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push('/businesses'))
      .catch((err) => this.setState({errors: err.response.data}))
  }

  componentDidMount() {
    axios.get('/api/products')
      .then(res => {
        console.log(res)
        const options = res.data.map(product => {
          return {'value': product.id, 'label': product.name}
        })
        this.setState({ options })
      })
  }

  render() {
    return(
      <div className="section">
        <h3 className="title has-text-centered">Create Your Business</h3>
        <BusinessesForm
          name='business'
          data={this.state.data}
          errors={this.state.errors}
          options = {this.state.options}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default BusinessesNew

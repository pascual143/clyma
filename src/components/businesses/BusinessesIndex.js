import React from 'react'
import axios from 'axios'
import BusinessCard from './BusinessCard'
import BusinessesSearchForm from './BusinessesSearchForm'

class BusinessesIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      businesses: [],
      category: 'All'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/businesses')
      .then(res => this.setState({ businesses: res.data }))
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  filteredBusinesses() {
    const re = new RegExp(this.state.location, 'i')
    if(!this.state.category) return this.state.businesses
    return this.state.businesses.filter(business => {
      return re.test(business.address) && (this.state.category === 'All' || business.category === this.state.category)
    })

  }

  render() {
    console.log(this.state)
    if(this.state.companies)
      return (
        <section className="section">
          <div className="container">
            <h4 className="title is-4">Loading...</h4>
          </div>
        </section>
      )

    return (
      <section className="section">
        <div className="container">
          <section className="section">
            <h2 className="title has-text-centered is-title-light is-size-2">The Companies</h2>
          </section>
          <hr />
          <BusinessesSearchForm handleChange={this.handleChange} />
          <div className="columns is-multiline">
            {this.filteredBusinesses().map(business =>
              <div key={business.id} className="column is-4">
                <BusinessCard {...business} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default BusinessesIndex

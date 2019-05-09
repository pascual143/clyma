import React from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import ProductsSearchForm from './ProductsSearchForm'

class ProductsIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      products: [],
      category: 'All'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/products')
      .then(res => this.setState({ products: res.data }))

  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  filteredProducts() {
    const re = new RegExp(this.state.location, 'i')
    if(!this.state.category) return this.state.products
    return this.state.products.filter(product => {
      return re.test(product.address) && (this.state.category === 'All' || product.category === this.state.category)
    })
  }

  render() {
    console.log(this.state)
    if(this.state.products.length === 0){
      return(
        <section className="section">
          <div className="container">
            <h4 className="title is-4">Loading...</h4>
          </div>
        </section>
      )
    }
    return (

      <section className="section">
        <div className="container">
          <section className="section">
            <h2 className="title has-text-centered is-title-light is-size-2">Search Products</h2>
          </section>
          <hr />
          <ProductsSearchForm handleChange={this.handleChange} />
          <div className="columns is-multiline">
            {this.filteredProducts().map(product =>
              <div key={product.id} className="column is-one-quarter">
                <ProductCard {...product} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default ProductsIndex

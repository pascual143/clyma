import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ id, name, image }) => {
  return (
    <Link to={`/products/${id}`}>
      <div className="isImage">
        <figure className="image is-2by3">
          <img src={image} alt={name}  className="productImage"/>
          <div className="middle">
            <div className="text">{name}</div>
          </div>
        </figure>
      </div>
    </Link>
  )
}

export default ProductCard

import React from 'react'
import { Link } from 'react-router-dom'

const BusinessCard = ({ id, name, image }) => {
  return (

    <Link to={`/businesses/${id}`}>
      <div className="">
        <figure className="image is-2by3">
          <img src={image} alt={name} className="productImage thumbnail"/>
          <div className="middle">
            <div className="text is-size-6">{name}</div>
            <p className="has-text-white">products</p>
          </div>
        </figure>
      </div>

    </Link>
  )
}

export default BusinessCard

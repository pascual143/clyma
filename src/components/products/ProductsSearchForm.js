import React from 'react'

const ProductsForm = ({ handleChange }) => {

  return (

    <div className="field">
      <div className="control courseFormDiv is-flex">
        <label className="label is-searchform"> <strong> Categories </strong> </label>
        <div className="select is-rounded">
          <select
            name="category"
            onChange={handleChange}
          >
            <option> All </option>
            <option> Finance</option>
            <option> Construction </option>
            <option> Tecnology </option>
            <option> Automotion </option>
            <option> Food and Beverage </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductsForm

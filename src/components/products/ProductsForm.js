import React from 'react'


const ProductsForm = ({ data, handleChange, handleSubmit, errors  }) => {
  return (
    <div className="container">
      <div className="column is-6 is-offset-3 ">
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={data.name || ''}
                />
                {errors.name && <small className="help is-danger">{errors.name}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Emisions</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="End date"
                  name="end_date"
                  onChange={handleChange}
                  value={data.emisions || ''}
                />
                {errors.emisions && <small className="help is-danger">{errors.end_date}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                  value={data.description || ''}
                />
                {errors.description && <small className="help is-danger">{errors.description}</small>}
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="category"
                    defaultValue="Please Choose..."
                    onChange={handleChange}
                    value={data.category}
                  >
                    <option disabled>Please Choose...</option>
                    <option value="" > Search All </option>
                    <option> Finance</option>
                    <option> Construction </option>
                    <option> Tecnology </option>
                    <option> Automotion </option>
                    <option> Food and Beverage </option>
                  </select>
                </div>
                {errors.category && <small className="help is-danger">{errors.category}</small>}
              </div>
            </div>

            <div>
              <button className="button is-rounded is-medium is-fullwidth is-primary product-form">Submit <i className="far fa-product homepage"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default ProductsForm

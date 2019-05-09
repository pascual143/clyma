import React from 'react'

const BusinessesForm = ({ handleChange }) => {

  return (

    <div className="field">
      <div className="control productFormDiv is-flex">
        <div className="field">
          <div className="control is-flex">
            <label className="label is-searchform"> <strong> Search By Name </strong> </label>
            <form>
              <input
                name="name"
                className="input searchBar is-rounded"
                type="text"
                placeholder="Name"
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessesForm

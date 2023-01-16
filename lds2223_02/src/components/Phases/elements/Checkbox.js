import React, { useContext } from 'react'
const Checkbox = ({ field_id, field_label, field_value }) => {

    return (
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id={field_id+"exampleCheck1"} checked={field_value}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">{field_label}</label>
        </div>
    )
}

export default Checkbox

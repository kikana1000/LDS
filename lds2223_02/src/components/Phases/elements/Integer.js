import React, { useContext } from 'react'

const Integer = ({ field_id, field_label, field_placeholder, field_value }) => {
    return (
        <div className="mb-3">
            <label htmlFor="Integer1" className="form-label">{field_label}</label>
            <input type="number" className="form-control" id={field_id+"Integer1" }
                placeholder={field_placeholder ? field_placeholder : ''}
            />
        </div>
    )
}

export default Integer

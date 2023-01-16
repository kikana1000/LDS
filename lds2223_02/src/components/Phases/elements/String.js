import React, { useContext } from 'react'
const String = ({ field_id, field_label, field_placeholder, field_value }) => {
    return (
        <div className="mb-3">
            <label htmlFor="String1" className="form-label">Text</label>
            <input type="text" className="form-control" id={field_id+"String1"}
                placeholder={field_placeholder ? field_placeholder : ''}
            />
        </div>
    )
}

export default String

import React from 'react'
const Select = ({ name, field_label, field_placeholder, field_value, field_options }) => {


    return (
        <div className="mb-3">
            <label className="form-label">{field_label}</label>
            <select defaultValue="" id={name+"Select1"} className="form-select" aria-label="Default select example"
            >
                <option value="" disabled >--Please choose an option--</option>
                {field_options.length > 0 && field_options.map((option, i) =>
                    <option value={option.option_label} key={i}>{option.option_label}</option>

                )}
            </select>
        </div>
    )
}

export default Select

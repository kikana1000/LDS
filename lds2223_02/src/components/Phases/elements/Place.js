import React, { useContext, useEffect, useState } from 'react'
import { variables } from '../../Variables.js';

const Place = ({ name,field_id, field_label, field_placeholder, field_value, field_value_id,field_value_name,field_value_typeid,field_value_address }) => {
    const [list,setList] = useState([]);

    useEffect(() => {
		
		refreshList();
	  }, [])

      const refreshList =()=>{

		fetch(variables.API_URL + 'establishment')
            .then(response => response.json())
            .then(data => {   
				setList(data);
            });
			
	}
    return (
        <div className="mb-3">
            <label htmlFor="PlaceID1" className="form-label">Place ID</label>
            
            <select defaultValue="" id={name+"PlaceID1"} className="form-select" aria-label="Default select example"
            >
                <option value="" disabled >--Please choose an option--</option>
                {list.length > 0 && list.map((option, i) =>
                    <option value={option.ID} key={i}>{option.name}</option>

                )}
            </select>
        </div>
    )
}

export default Place

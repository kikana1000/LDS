import React, { useContext, useEffect, useState } from 'react'
import { variables } from '../../Variables.js';


const Vehicle= ({name, field_id, field_label, field_placeholder, field_value,field_value_id,field_value_description,field_value_licenseplate }) => {
    const [list,setList] = useState([]);

    useEffect(() => {
		
		refreshList();
	  }, [])

      const refreshList =()=>{

		fetch(variables.API_URL + 'vehicle')
            .then(response => response.json())
            .then(data => {   
				setList(data);
            });
			
	}

    return (
        <div className="mb-3">
            <label htmlFor="VehicleID1" className="form-label">Vehicle ID</label>
            
            <select defaultValue="" id={name+"VehicleID1"} className="form-select" aria-label="Default select example"
            >
                <option value="" disabled>--Please choose an option--</option>
                {list.length > 0 && list.map((option, i) =>
                    <option value={option.ID} key={i}>{option.licensePlate}</option>

                )}
            </select>
        </div>
    )
}

export default Vehicle

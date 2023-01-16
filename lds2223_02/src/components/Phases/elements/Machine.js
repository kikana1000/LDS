import React, { useContext, useEffect, useState } from 'react'
import { variables } from '../../Variables.js';



const Machine = ({ name,field_id, field_label, field_placeholder, field_value,field_value_id,field_value_name,field_value_establishmentid, field_value_aquisitionyear, field_value_function}) => {
    const [list,setList] = useState([]);

    useEffect(() => {
		
		refreshList();
	  }, [])

      const refreshList =()=>{

		fetch(variables.API_URL + 'machine')
            .then(response => response.json())
            .then(data => {   
				setList(data);
            });
			
	}
    return (
        <div className="mb-3">
            <label htmlFor="MachineID1" className="form-label">Machine ID</label>
            
            <select defaultValue="" id={name+"MachineID1"} className="form-select" aria-label="Default select example"
            >
                <option value="" disabled >--Please choose an option--</option>
                {list.length > 0 && list.map((option, i) =>
                    <option value={option.ID} key={i}>{option.name}</option>

                )}
            </select>
        </div>
    )
}

export default Machine

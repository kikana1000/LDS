import React, { useContext, useEffect, useState } from 'react'
import { variables } from '../../Variables.js';

const Employee = ({ name, field_label, field_placeholder, field_value, field_value_id, field_value_name, field_value_email, field_value_phone, field_value_nif, field_value_roleid}) => {
    const [list,setList] = useState([]);

    useEffect(() => {
		
		refreshList();
	  }, [])

      const refreshList =()=>{

		fetch(variables.API_URL + 'employee')
            .then(response => response.json())
            .then(data => {   
				setList(data);
            });
			
	}
    return (
        <div className="mb-3">
            <label htmlFor="EmployeeID1" className="form-label">Employee ID</label>
            
            <select defaultValue="" id={name+"EmployeeID1"} className="form-select" aria-label="Default select example"
            >
                <option value="" disabled >--Please choose an option--</option>
                {list.length > 0 && list.map((option, i) =>
                    <option value={option.name} key={i}>{option.name}</option>

                )}
            </select>
        </div>
    )
}

export default Employee

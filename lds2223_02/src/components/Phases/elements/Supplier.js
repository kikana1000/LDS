import React, { useContext, useEffect, useState } from 'react'
import { variables } from '../../Variables.js';

const Supplier= ({ name,type}) => {
    const [list,setList] = useState([]);

    useEffect(() => {
		
		refreshList();
	  }, [])

      const refreshList =()=>{

		fetch(variables.API_URL + 'supplier')
            .then(response => response.json())
            .then(data => {   
				setList(data);
            });
			
	}
    return (
        <div className="mb-3">
            <label htmlFor="SupplierID1" className="form-label">{Supplier.name}</label>
            
            <select defaultValue="" id={name+"SupplierID1"} className="form-select" aria-label="Default select example"
            >
                <option value="" disabled >--Please choose an option--</option>
                {list.length > 0 && list.map((option, i) =>
                    <option value={option.ID} key={i}>{option.name}</option>

                )}
            </select>
        </div>
    )
}

export default Supplier

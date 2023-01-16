import React, { useState, useEffect } from 'react';
import './VisualizeTrackingPhasesStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPenToSquare, faPlus, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { variables } from '../Variables.js';

const VisualizeTrackingPhases = () => {

	let history = useNavigate();

	const [state, setState] = useState({
		phases: []
	});

	useEffect(() => {
		refreshList();
	  }, [])

	const refreshList =()=>{

		fetch(variables.API_URL + 'phase')
            .then(response => response.json())
            .then(data => {
                setState({
                    phases: data
                });
            });

	}
	
	const remove=(id)=> {
		
		fetch(variables.API_URL + 'phase/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: id,

            })
        }).then(res => res.json())
            .then((result) => {
                alert("Success");
                this.refreshList();
            }, (error) => {
                alert("Failed");
            });
		
			refreshList();
	}
    

	let {phases} = state;

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='item-list'>
					{phases.map((phase, index) => (
						<div className='item-container'>
							<div className='item-name' >
								
									 <Link to={'/tracking/trackingPhase/'+phase.ID}>

									<FontAwesomeIcon icon={faCircle} />
                                        <span>{phase.name}</span>
                                        </Link>
								
							</div>
							<div className='item-name' >

                                <Link to={'/phasetype/'+phase.ID}>

                                    <FontAwesomeIcon icon={faPlus} />
                                
                                </Link>

                            </div>
							<div className='item-name' >

                                <Link to={'/phaserecords/'+phase.ID}>

                                    <FontAwesomeIcon icon={faList} />
                                
                                </Link>

                            </div>
                            <div className='item-name' >

                                <Link to={'/tracking/editTrackingPhase/'+phase.ID}>

                                    <FontAwesomeIcon icon={faPenToSquare} />
                                
                                </Link>

                            </div>
							<div className='item-name deleteButton' onClick={() => remove(phase.ID)}>
								
                                    <FontAwesomeIcon icon={faTrash} />
									

                            </div>
													
						</div>
						
					))}
							
				</div>
				
			</div>
			<div className='item-name-plus'>


							<Link to={'/tracking/addTrackingPhase'}>

								<FontAwesomeIcon icon={faPlus} />

							</Link>

				</div>
		</div>
	);
};

export default VisualizeTrackingPhases;
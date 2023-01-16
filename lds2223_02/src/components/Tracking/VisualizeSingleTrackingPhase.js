import React, { useState, useEffect } from 'react';
import './VisualizeSingleTrackingPhaseStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { variables } from '../Variables.js';

const VisualizeSingleTrackingPhase = () => {

    const {index} = useParams();
	const [phase, setPhase] = useState({});
	const [data, setData] = useState([]);

    useEffect(() => {
		
		refreshList();
	  }, [])

	const refreshList =()=>{

		fetch(variables.API_URL + 'phase/' + index)
            .then(response => response.json())
            .then(data => {   
				setPhase(data[0]);
				setData(JSON.parse(data[0].jsonStructure));
            });
			
	}

	return (
		<div className='app-background'>
			<div className='main-container'>
                <div className='phase-title'>
					<Link to={'/tracking/visualizeTrackingPhase'}>
						<FontAwesomeIcon icon={faCircle} />
						<span>{phase.name}</span>
					</Link>    
					        
                </div>
				<div className='item-list'>
						
                            {data.map((data, index) => (
						<div className='item-container-single'>
							<div className='item-name' >
								
									<FontAwesomeIcon icon={faCircle} />
                                        <span>{data.name}</span>
								
							</div>
                            <div className='item-name-type'>

                            <span>Type: {data.type}</span>				

                            </div>
							</div>
					))}
				
				</div>
			</div>
		</div>
	);
};

export default VisualizeSingleTrackingPhase;
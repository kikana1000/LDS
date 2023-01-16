import React, { useState, useEffect } from 'react';
import '../Tracking/VisualizeSingleTrackingPhase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import "../../pages/MasterData/styles.scss";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { variables } from '../Variables.js';

const PhaseRecords = () => {
    let history = useNavigate();
    const { index } = useParams();
    const [phaseHistory, setPhaseHistory] = useState([]);
    const [phase, setPhase] = useState({});

    useEffect(() => {
		
		refreshList();
        getPhase();
	  }, [])

      const refreshList =()=>{

		fetch(variables.API_URL + 'phaserecord/phase/' + index)
            .then(response => response.json())
            .then(data => {   
				setPhaseHistory(data);
            });
			
	}

    const getPhase = () =>{

        fetch(variables.API_URL + 'phase/' + index)
            .then(response => response.json())
            .then(data => {   
				setPhase(data[0]);
            });

    }

    const getIndex = (index) => {
        
            history('/singlePhaseRecord/' + index, { replace: true });

        }


    return (
        <div className='local-bootstrap app-background'>
            <div className='main-container'>
                <div className='phase-title'>
                    <Link to={'/tracking/visualizeTrackingPhase'}>
                        <span>{phase.name}</span>
                    </Link>
                </div>
                <div className='item-list'>

                    {phaseHistory.map((phase, index) => (
                        <div className='item-container'>
                            <div className='btn item-name' onClick={() => getIndex(phase.ID)}>
                                    <FontAwesomeIcon icon={faCircle} />
                                    <span>{phase.date}</span>
                            </div>
                            <div className='item-name-type'>

                                <span>{phase.hash}</span>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default PhaseRecords;
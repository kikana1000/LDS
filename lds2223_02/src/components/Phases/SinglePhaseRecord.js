import React, { useState, useEffect } from 'react';
import '../Tracking/VisualizeSingleTrackingPhase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import "../../pages/MasterData/styles.scss";
import { useNavigate } from "react-router-dom";
import { variables } from '../Variables.js';

const SinglePhaseRecord = () => {

	let history = useNavigate();
	const { index } = useParams();
	const [record,setRecord] = useState({});
	const [recordData,setRecordData] =useState([]);

	useEffect(() => {
		
		refreshList();
	  }, [])

	  const refreshList =()=>{

		fetch(variables.API_URL + 'phaseRecord/' + index)
            .then(response => response.json())
            .then(data => {   
				setRecord(data[0]);
				setRecordData(JSON.parse(data[0].jsonStructure));
            });
			
	}



	const getIndex = () => {

				history('/phaserecords/' + record.phaseID, { replace: true });

	}

	console.log(recordData);

	return (
		<div className='local-bootstrap app-background'>
			<div className='main-container'>
				<div className='phase-title'>
				<div className='btn item-name' onClick={() => getIndex(index)}>
						<FontAwesomeIcon icon={faCircle} />
						<span>{record.phaseID}</span>
					</div>
				</div>
				<div className='item-list'>

					{recordData.map((record, index) => (
						<div className='item-container-single'>
							<div className='item-name' >


								<FontAwesomeIcon icon={faCircle} />
								<span>{record.field_value}</span>



							</div>
							<div className='item-name-type'>

								<span>{record.type}</span>

							</div>
						</div>
					))}

				</div>
			</div>
		</div>
	);
};

export default SinglePhaseRecord;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X,GearFill } from "react-bootstrap-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"
import '../../../components/Popup/Popup.css'
import { Button } from "react-bootstrap";

function PopupEdit(props) {

  const [inputTypeID, setInputTypeID] = useState("");

  const schema = yup.object().shape({
    reference: yup.string().required(validationMessage.required),
    stateID: yup.string().required(validationMessage.required),
  })

  const [firstTime,setFirstTime] = useState(true);
  
  const loadvalues = () => {
    if (props.productionBatch != null && firstTime === true) {
      setValue("reference",props.productionBatch.reference);
      setValue("stateID",props.productionBatch.stateID);
      setInputTypeID(props.productionBatch.stateID);
      setFirstTime(false)
    }
  };

  useEffect(() => loadvalues());

  const handleclose = () => {
    props.setTrigger(false);
    reset()
    setFirstTime(true)
    props.setElementEdit(null);
  };

  const {
    handleSubmit, register, reset,setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  
  const onSubmit = (data) => {
    const newProductionBatch = {
      ID: props.productionBatch.ID, reference:data.reference, stateID: inputTypeID
  }

  props.setProductionBatches(newProductionBatch);
    
    handleclose();
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
      <div className="modal-content">
            <div className="modal-header">
       
        <h3 className="modal-title mx-auto">
          {" "}
          <FontAwesomeIcon  icon={faBoxOpen}  size={"lg"} />{" "} Edit
          Production Batch
        </h3>
        <X
          className="btn-close"
          fontSize={"x-large"}
          cursor="pointer"
          color="grey"
          onClick={() => handleclose()}
        />
        </div>
                <hr/>
        <form className="form-popup" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-body">
          <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="name">
                Reference:{" "}
              </label>

              <div className="col-sm-9"> 
              <input
                type="text"
                id="name"
                {...register("reference")}
                className="form-control form-control-sm"
                placeholder="Reference of the Batch"
                required
              />
               <small className='error'>{errors.reference?.message}</small>
              </div>
            </div>
           
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="state">
                State:{" "}
              </label>
              <div className="col-sm-9"> 
              <select
            value={inputTypeID}
            onChange={(event) => setInputTypeID(event.target.value)}
          >
            <option value="" disabled >--Please choose an option--</option>
            {props.productionBatchTypes.length > 0 && props.productionBatchTypes.map((option, i) =>
              <option value={option.ID} key={option.ID}>{option.name}</option>

            )}
          </select>
              <small className='error'>{errors.state?.message}</small>
              </div>
            </div>
          </div>
          <div className="footer">
            <Button
              type="submit"
              variant="outline-success"
              onClick={handleSubmit(onSubmit)}
            >
              {" "}
              Edit Establishment{" "}
              <GearFill color="green" className="btn-icon" />
            </Button>
          </div>
        </form>
        {props.children}
      </div>
    </div>
    </div>
  ) : (
    ""
  );
}
export default PopupEdit;

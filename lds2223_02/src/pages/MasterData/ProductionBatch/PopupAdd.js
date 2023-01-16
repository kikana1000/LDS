import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X, Plus } from "react-bootstrap-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"
import '../../../components/Popup/Popup.css'
import { Button } from "react-bootstrap";

function PopupAdd(props) {
  const schema = yup.object().shape({
    reference: yup.string().required(validationMessage.required),
    stateID: yup.string().required(validationMessage.required),
  })

  const handleclose = () => {
    props.setTrigger(false);
    reset()
  };

  const {
    handleSubmit, register, reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  
  const onSubmit = (data) => {  
    const newElement = {
      reference: data.reference,
      stateID: data.stateID,
    };

    props.setElementList(newElement);
    handleclose()
  };
  
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
            <div className="modal-content">
            <div className="modal-header">
        
        <h3 className="modal-title mx-auto">
          {" "}
          <FontAwesomeIcon  icon={faBoxOpen}  size={"lg"} />{" "} Register
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
                id="reference"
                {...register("reference")}
                className="form-control form-control-sm"
                placeholder="Reference of the Batch"
                required
              />
               <small className='error'>{errors.name?.message}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="state">
                State:{" "}
              </label>
              <div className="col-sm-9"> 
              <select
                className="form-control form-control-sm"
                id="stateID"
                {...register("stateID")}
                placeholder="State"
                required
              >
                {props.productionBatchTypes.map((value, index) => 
                  <option value={value.ID} key={value.ID}>{value.name}</option>
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
            >
              {" "}
              Add Production Batch <Plus color="green" className="btn-icon" />
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
export default PopupAdd;

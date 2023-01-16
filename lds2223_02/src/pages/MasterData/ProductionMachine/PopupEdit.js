import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import Form from "react-bootstrap/Form";
import * as yup from "yup"
import { X, Tools } from "react-bootstrap-icons";
import "../../../components/Popup/Popup.css";
import { Button } from "react-bootstrap";
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"

function PopupEdit(props) {

  const [inputEstablishmentID, setInputEstablishmentID] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required(validationMessage.required),
    functionMachine: yup.string().required(validationMessage.required),
  })
  const [firstTime, setFirstTime] = useState(true);

  const loadvalues = () => {
    console.log(props);
    if (props.machine != null && firstTime === true) {
      setValue("functionMachine",props.machine.functionMachine);
      setValue("establismentID",props.machine.establishmentID);
      setInputEstablishmentID(props.machine.establishmentID);
      setValue("aquisitionYear",props.machine.aquisitionYear);
      setValue("name",props.machine.name);
      setFirstTime(false);
    }
  };

  useEffect(() => loadvalues());

  const handleclose = () => {
    props.setTrigger(false);
    reset()
    setFirstTime(true);
    props.setElementEdit(null);
  };

  const {
    handleSubmit, register, reset,setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  
  const onSubmit = (data) => {
    const newMachine = {
      ID: props.machine.ID, name:data.name,functionMachine: data.functionMachine, aquisitionYear: data.aquisitionYear,establishmentID: inputEstablishmentID, isActive: true
  }

  props.setProductionMachine(newMachine);
    
    handleclose();
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
      <div className="modal-content">
            <div className="modal-header">
       
        <h3 className="modal-title mx-auto">
          {" "}
          <Tools className="header-icon-popup" fontSize={"x-large"} /> Edit
          Production Machine
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
        <form className="form-popup">
          <div className="form-body">
          <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="name">
                Name:{" "}
              </label>

              <div className="col-sm-9"> 
              <input
                type="text"
                id="name"
                {...register("name")}
                className="form-control form-control-sm"
                placeholder="Name of the Machine"
                required
              />
               <small className='error'>{errors.name?.message}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="purchaseDate">
                Purchase Date:{" "}
              </label>
              <div className="col-sm-9"> 
              <input type="number" className="form-control form-control-sm" id="purchaseDate" {...register("aquisitionYear")} />
              <small className='error'>{errors.aquisitionYear?.message}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="purpose">
                Purpose:{" "}
              </label>
              <div className="col-sm-9"> 
              <input
                type="text"
                id="purpose"
                {...register("functionMachine")}
                className="form-control form-control-sm"
                placeholder="Purpose of the Machine"
                required
              />
              <small className='error'>{errors.functionMachine?.message}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="purchaseDate">
                Establishment:{" "}
              </label>
              <div className="col-sm-9"> 
              <select
                className="form-control form-control-sm"
                value={inputEstablishmentID}
                onChange={(event) => setInputEstablishmentID(event.target.value)}
              >
                {props.establishmentList.length > 0 && props.establishmentList.map((option, i) =>
              <option value={option.ID} key={option.ID}>{option.name}</option>

            )}
              </select>
              <small className='error'>{errors.establishmentID?.message}</small>
              </div>
            </div>
          </div>
          <div className="footer">
            <Button
              establishment="submit"
              variant="outline-success"
              onClick={handleSubmit(onSubmit)}
            >
              {" "}
              Edit Production Machine{" "}
              <Tools color="green" width={"40"} height={"40"} />
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

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import Form from "react-bootstrap/Form";
import * as yup from "yup"
import { X, Plus, Tools } from "react-bootstrap-icons";
import "../../../components/Popup/Popup.css";
import { Button } from "react-bootstrap";
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"

function PopupAdd(props) {
  const schema = yup.object().shape({
    name: yup.string().required(validationMessage.required),
    functionMachine: yup.string().required(validationMessage.required),
    aquisitionYear: yup.number().required(validationMessage.required),
    establishmentID: yup.number().required(validationMessage.required),
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
      name: data.name,
      functionMachine: data.functionMachine,
      aquisitionYear: data.aquisitionYear,
      establishmentID: data.establishmentID,
      isActive: true,
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
          <Tools className="header-icon-popup" fontSize={"x-large"} /> Register
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
        <form className="form-popup" onSubmit={handleSubmit(onSubmit)}>
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
                id="establishment"
                {...register("establishmentID")}
                placeholder="Establishment"
                required
              >
                {props.establishmentList.map((value, index) => 
                  <option value={value.ID} key={value.ID}>{value.name}</option>
              )}
              </select>
              <small className='error'>{errors.establishmentID?.message}</small>
              </div>
            </div>
          </div>
          <div className="footer">
            <Button
              type="submit"
              variant="outline-success"
            >
              {" "}
              Add Production Machine{" "}
              <Plus color="green" className="btn-icon" />
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

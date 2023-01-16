import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X, Building, GearFill } from "react-bootstrap-icons";
import '../../../components/Popup/Popup.css'
import { Button } from "react-bootstrap";
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"


function PopupEdit(props) {

  const [inputTypeID, setInputTypeID] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required(validationMessage.required),
    typeID: yup.string().matches(validationPatterns.number,validationMessage.number).min(1,"This field must have 1-2 digits").max(2,"This field must have 1-2 digits").required(validationMessage.required),
    address: yup.string().max(120, validationMessage.max120).required(validationMessage.required),
    isActive: yup.boolean().required(validationMessage.required)
  })

  const [firstTime,setFirstTime] = useState(true);
  
  const loadvalues = () => {
    if (props.establishment != null && firstTime === true) {
      setInputTypeID(props.establishment.typeID);
      setValue("name",props.establishment.name);
      setValue("typeID",props.establishment.typeID);
      setValue("address",props.establishment.address);
      setValue("isActive",props.establishment.isActive);
      setFirstTime(false)
    }

  };

  useEffect(() => loadvalues());

  const handleclose = () => {
    props.setTrigger(false);
    reset()
    props.setElementEdit(null);
    setFirstTime(true)
  };

  const {
    handleSubmit, register, reset,setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });


  const onSubmit = (data) => {
    const newEstablishment = {
      ID: props.establishment.ID, name:data.name,address: data.address, typeID: inputTypeID, isActive: true
  }

  props.setEstablishments(newEstablishment);
    
    handleclose();
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
      <div className="modal-content">
            <div className="modal-header">
        
        <h3 className="modal-title mx-auto">
          {" "}
          <Building className="header-icon-popup" fontSize={"x-large"} /> Edit
          Establishment
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
        <form className="form-popup" onSubmit={handleSubmit(onSubmit)}> <div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="name">
                Name:{" "}
              </label>
              <div className="col-sm-9">
              <input
                type="text"
                id="name"
                className="form-control form-control-sm"
                placeholder="Full Name"
                {...register("name")}
                required
              />
              <small className='error'>{errors.name?.message}</small>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="address">
                Type:{" "}
              </label>
              <div className="col-sm-9">
              <select
            value={inputTypeID}
            onChange={(event) => setInputTypeID(event.target.value)}
          >
            <option value="" disabled >--Please choose an option--</option>
            {props.establishmentsType.length > 0 && props.establishmentsType.map((option, i) =>
              <option value={option.ID} key={option.ID}>{option.name}</option>

            )}
          </select>
              <small className='error'>{errors.typeID?.message}</small>
              </div>
              </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="isActive">
              Active?:{" "}
              </label>
              <div className="col-sm-9">
              <select
                id="active"
                className="form-control form-control-sm"
                {...register("active")}
                required
                defaultValue={true}
              ><option value={true}>True</option>
              <option value={false}>False</option>
              </select>
              <small className='error'>{errors.isActive?.message}</small>
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label" htmlFor="address">
                Address:{" "}
              </label>
              <div className="col-sm-9">
              <textarea className="form-control form-control-sm form_textArea" type="text" placeholder="Address" {...register("address")} required />
              <small className='error'>{errors.address?.message}</small>
              </div>
            </div>
            </div>
          <div className="footer">
            <Button
              type="submit"
              variant="dark"
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

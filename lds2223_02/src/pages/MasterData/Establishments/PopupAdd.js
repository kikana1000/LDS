import React,{ useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X, Plus, Building } from "react-bootstrap-icons";
import '../../../components/Popup/Popup.css'
import { Button } from "react-bootstrap";
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"

function PopupAdd(props) {

  const [inputTypeID, setInputTypeID] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required(validationMessage.required),
    address: yup.string().max(120, validationMessage.max120).required(validationMessage.required),
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
      address: data.address,
      typeID: inputTypeID,
      isActive: true,
    };
    props.setEstablishments(newElement);
    handleclose()
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
      <div className="modal-content">
            <div className="modal-header">
        <h3 className="modal-title mx-auto">
          {" "}
          <Building className="header-icon-popup" fontSize={"x-large"} /> Register
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
            <label className="col-sm-3 col-form-label" htmlFor="address">
              Address:{" "}
            </label>
            <div className="col-sm-9">
              <textarea className="form-control  form-control-sm form_textArea" type="text" placeholder="Address" {...register("address")} required />
              <small className='error'>{errors.address?.message}</small>
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
              Add Establishment <Plus color="green" className="btn-icon" />
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

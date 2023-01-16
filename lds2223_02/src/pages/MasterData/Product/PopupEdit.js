import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { X, GearFill } from "react-bootstrap-icons";
import "../../../components/Popup/Popup.css";
import { Button } from "react-bootstrap";

import { MultiSelected } from "../../../components";
import {
  validationMessage,
  validationPatterns,
} from "../../../pages/MasterData/validation.js";

function PopupEdit(props) {

  const [inputStateID, setInputStateID] = useState("");
  const [inputProductionBatchID, setInputProductionBatchID] = useState("");
  
  const schema = yup.object().shape({
    name: yup.string().required(validationMessage.required),
    reference: yup
      .string()
      .matches(validationPatterns.number, validationMessage.number)
      .min(9, "This field must have only nine digits")
      .max(9, "This field must have only nine digits")
      .required(validationMessage.required),
    description: yup
      .string()
      .max(150, validationMessage.max150)
      .required(validationMessage.required),
  });
  const [firstTime, setFirstTime] = useState(true);
  const loadvalues = () => {
    if (props.product != null && firstTime === true) {
      setInputStateID(props.product.stateID);
      setInputProductionBatchID(props.product.productionBatchID)
      setValue("description", props.product.description);
      setValue("reference", props.product.reference);
      setValue("name", props.product.name);
      setFirstTime(false);
    }
  };

  useEffect(() => loadvalues());

  const handleclose = () => {
    props.setTrigger(false);
    reset();
    setFirstTime(true);
    props.setMaterial(null);
  };

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newProduct = {
      ID: props.product.ID, name:data.name,reference: data.reference, stateID: inputStateID, description: data.description,productionBatchID:inputProductionBatchID
  }

  props.setProducts(newProduct);
    
    handleclose();
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
            <div className="modal-content">
            <div className="modal-header">
        
        <h3 className="modal-title mx-auto">
          {" "}
          <FontAwesomeIcon icon={faWrench} fontSize={"x-large"} /> Edit Product
        </h3>
        <X
          className="btn-close"
          fontSize={"x-large"}
          cursor="pointer"
          color="black"
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
                placeholder="Material Name"
                {...register("name")}
                required
              />
              <small className="error">{errors.name?.message}</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="productionBatch">
              Reference:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="productionBatch"
                className="form-control form-control-sm"
                placeholder="Reference Number"
                {...register("reference")}
                required
              />
              <small className="error">{errors.reference?.message}</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="desc">
              Description:{" "}
            </label>
            <div className="col-sm-9">
              <textarea
                type="text"
                id="description"
                className="form-control  form-control-sm form_textArea"
                {...register("description")}
                placeholder="Description about the Material"
                required
              />
              <small className="error">{errors.description?.message}</small>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="description">
              State:{" "}
            </label>
            <div className="col-sm-9">
            <select
            value={inputStateID}
            onChange={(event) => setInputStateID(event.target.value)}
          >
            <option value="" disabled >--Please choose an option--</option>
            {props.productsType.length > 0 && props.productsType.map((option, i) =>
              <option value={option.ID} key={option.ID}>{option.name}</option>

            )}
          </select>
              <small className="error">{errors.description?.message}</small>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="description">
              Production Batch:{" "}
            </label>
            <div className="col-sm-9">
            <select
            value={inputProductionBatchID}
            onChange={(event) => setInputProductionBatchID(event.target.value)}
          >
            <option value="" disabled >--Please choose an option--</option>
            {props.productionBatches.length > 0 && props.productionBatches.map((option, i) =>
              <option value={option.ID} key={option.ID}>{option.reference}</option>

            )}
          </select>
              <small className="error">{errors.description?.message}</small>
            </div>
          </div>
</div>
          <div className="footer">
            <Button type="submit" variant="dark">
              {" "}
              Edit material <GearFill className="btn-icon" />
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

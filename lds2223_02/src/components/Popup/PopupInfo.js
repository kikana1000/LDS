import React from "react";
import { X, InfoSquare, InfoCircle } from "react-bootstrap-icons";
import "./Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faPenToSquare,
  faPlus,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss"

import { Row, Container, Col } from "react-bootstrap";
function PopupInfo(props) {
  return props.trigger ? (
    <div className="popup info">
      <div className="popup-inner">
        <div className="modal-content">
        <div className="modal-header">
        <h3 className="modal-title mx-auto">
          {/* <FontAwesomeIcon icon={faInfo} size={"fa-2xs"}/>nfo: */}
          <InfoCircle />
          nfo:
        </h3>
        <X
        data-bs-dismiss="modal"
          className="btn-close"
          fontSize={"x-large"}
          cursor="pointer"
          color="black"
          onClick={() => props.setTrigger(false)}
        />
        </div>
        <hr/>
        <Container className=" flex ">
          {props.headData.map((value, index) => (
            // <Row key={index} >
            //   <Col md="auto">{value} </Col>
            //   <Col sm={2}>{props.data[value]}</Col>
            // </Row>
            <div className="row form-line" key={index}>
              <label
                className="col-sm-4 col-form-label align-rigth"
                htmlFor={value}
              >
                {value}:{" "}
              </label>
              {/* <input
                  type="text"
                  id="name"
                  className="form-control form-control-sm"
                  placeholder="Material Name"
                  {...register("name")}
                  required
                /> */}
              {typeof props.data[value] === "boolean" ? (
                props.data[value] ? (
                  <label className="col-sm-8 align-left">True</label>
                ) : (
                  <label className="col-sm-8 align-left">False</label>
                )
              ) : (
                <label className="col-sm-8 align-left">
                  {props.data[value]}
                </label>
              )}
            </div>
          ))}
        </Container>
        {props.children}
    </div>
    </div></div>
  ) : (
    ""
  );
}
export default PopupInfo;

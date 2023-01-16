import React from "react";
import { SinglePhaseRecord } from "../../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SinglePhaseRecordPage() {

  let history = useNavigate();

  let user = localStorage.getItem("LoggedUser");

  useEffect(() => {
    if (user === null) {

      history('/login', { replace: true });
  
    }
  }, [])

  return (
    <div className="home">
      <div className="container">
        <div className="row-group align-items-center my-5">
          <div className="col-lg-7"></div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Tracking page</h1>
            <SinglePhaseRecord></SinglePhaseRecord>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePhaseRecordPage;
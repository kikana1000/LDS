import React, { useEffect } from "react";
import { CreateTrackingPhase } from "./../../components";
import "../MasterData/styles.scss";
import { useNavigate } from "react-router-dom";

function CreateTrackingPhasePage() {

  let history = useNavigate();

  let user = localStorage.getItem("LoggedUser");

  useEffect(() => {
    if (user === null) {

      history('/login', { replace: true });
  
    }
  }, [])

  return (
    <div className="local-bootstrap home">
      <div className="container">
        <div className="row-group align-items-center my-5">
          <div className="col-lg-5 colmn">
            <h1 className="font-weight-light">Tracking page</h1>
            <CreateTrackingPhase></CreateTrackingPhase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTrackingPhasePage;

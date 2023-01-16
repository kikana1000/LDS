import React from "react";
import { Phases } from "./../../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PhasesPage() {

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
        <div className="align-items-center my-5">
            <h1 className="font-weight-light">Phases page</h1>
            <Phases></Phases>
        </div>
      </div>
    </div>
  );
}

export default PhasesPage;

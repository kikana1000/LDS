/** @jsxImportSource theme-ui */

import React from "react";
import { ButtonComp } from "../../components";
import "./Error404Style.css"

function Error404() {

  const goHome = () => {
  window.location.href = "/";
  }

  return (
    <div className="error-404">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <img src="../../images/error-404.png"></img>
            <div className="button-home">
            <ButtonComp name={"Go home"} onClick={e=>goHome()} variant={"secondary"}></ButtonComp>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
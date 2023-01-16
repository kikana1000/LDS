/** @jsxImportSource theme-ui */

import React from "react";
import { Button } from "theme-ui";
function ButtonComp(props) {
  return  (
    <Button onClick={props.onClick} variant={props.variant}>{props.name}</Button>
  );
}
export default ButtonComp;
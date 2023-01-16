import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function AnimatedMulti(props) {
  let options = [];

  let values = [];

  const constValues=()=>{
    for (let i = 0; i < props.getValues.length; i++) {
      for (let j = 0; j < props.valuesMaterial.length; j++) {
        if (props.getValues[i].ID === props.valuesMaterial[j]) {
          const optionTemp = { value: props.getValues[i].ID, label: props.getValues[i].Name };
          values.push(optionTemp);
        }
      }
    }
    return values;
  }
  

  props.getValues.map((data, idx) => {
    const optionTemp = { value: data.ID, label: data.Name };
    options.push(optionTemp);
  });


  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={props.valuesMaterial!=undefined?constValues:undefined}
      isMulti
      options={options}
    ></Select>
  );
}

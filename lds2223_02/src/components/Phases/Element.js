import React from "react";
import Checkbox from "./elements/Checkbox";
import Input from "./elements/Input";
import Select from "./elements/Select";
import String from "./elements/String";
import Integer from "./elements/Integer";
import Employee from "./elements/Employee";
import Place from "./elements/Place";
import Vehicle from "./elements/Vehicle";
import Machine from "./elements/Machine";
import Supplier from "./elements/Supplier";
import Client from "./elements/Client";
import Material from "./elements/Material";
import Product from "./elements/Product";

const Element = ({
  field: {
    type,
    field_value,
    field_name
  },
}) => {
  switch (type) {
    case "String":
      return (
        <String
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
           field_value={field_value}
           field_name={field_name}
        />
      );
    case "Integer":
      return (
        <Integer
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
        />
      );
    case "Employee":
      return (
        <Employee
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          //  field_value_id={field__id}
          //  field_value_name={field_name}
          //  field_value_email={field_email}
          //  field_value_phone={field_phone}
          //  field_value_nif={field_nif}
          //  field_value_roleid={field_roleid}
        />
      );
    case "Place":
      return (
        <Place
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
        />
      );
    case "Vehicle":
      return (
        <Vehicle
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
        />
      );
    case "Machine":
      return (
        <Machine
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
        />
      );
    case "Supplier":
      return (
        <Supplier
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
        />
      );
    case "Client":
      return (
        <Client
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
        />
      );
    case "Material":
      return (
        <Material
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
        />
      );
    case "Product":
      return (
        <Product
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
           field_name={field_name}
          //  field_value_id={field__id}
          //  field_value_reference={field_reference}
          //  field_value_name={field_name}
          //  field_value_description={field_description}
          //  field_value_stateid={field_stateid}
        />
      );
    case "select":
      return (
        <Select
          // field_id={field_id}
          // field_label={field_label}
          // field_placeholder={field_placeholder}
          field_value={field_value}
          field_name={field_name}
          // field_options={field_options}
        />
      );

    default:
      return null;
  }
};

export default Element;

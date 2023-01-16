import { useState, useEffect } from "react";
import Element from "../Phases/Element";
import moment from "moment";
import "./PhasesStyle.css";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../../pages/MasterData/styles.scss";
import { variables } from '../Variables.js';
import sha256 from 'js-sha256';

function Phases() {

  const { index } = useParams();
  const [phase,setPhase] = useState({});
  const [phases,setPhases] = useState({});
  const [elements, setElements] = useState([]);
  const [historiesJSON, setHistoriesJSON] = useState([]);
  const [nextPhasesProduct, setNextPhasesProduct] = useState([]);
  const [nextPhasesMaterial, setNextPhasesMaterial] = useState([]);
  const [nextPhasesProductionBatch, setNextPhasesProductionBatch] = useState([]);

  useEffect(() => {

    refreshList();
    getPhases();
    getRecords();

  }, [])

  const refreshList =()=>{

    fetch(variables.API_URL + 'phase/' + index)
      .then(response => response.json())
      .then(data => {
        
        setElements(JSON.parse(data[0].jsonStructure));
        setPhase(data[0]);
        setNextPhasesMaterial(JSON.parse(data[0].nextPhasesMaterial));
        setNextPhasesProduct(JSON.parse(data[0].nextPhasesProduct));
        setNextPhasesProductionBatch(JSON.parse(data[0].nextPhasesProductionBatch));
      });
      
    }

  const getPhases = () => {

    fetch(variables.API_URL + 'phase')
      .then(response => response.json())
      .then(data => {
        
        setPhases(data);
      });
      

  }
  const getRecords = () => {

    fetch(variables.API_URL + 'phaseRecord')
      .then(response => response.json())
      .then(data => {
        
        setHistoriesJSON(data);
        
      });
      

  }

  let history = useNavigate();

  const getPhaseNextPhaseProduct = (id) => {

    let np = [];

    fetch(variables.API_URL + 'phase/' + id)
      .then(response => response.json())
      .then(data => {
        
        let x = data[0].nextPhasesProduct;
        if(x === undefined){
          return np;
        }else{
          np=x;

        }
        
      });

      return np;

  }

  const getPhaseNextPhaseMaterial = (id) => {
    let np = [];

    fetch(variables.API_URL + 'phase/' + id)
      .then(response => response.json())
      .then(data => {
        
        let x = data[0].nextPhasesMaterial;
        if(x === undefined){
          return np;
        }else{
          np=x;

        }
        
      });

      return np;

  }


  const getPhaseNextPhaseProductionBatch = (id) => {

    let np = [];

    fetch(variables.API_URL + 'phase/' + id)
      .then(response => response.json())
      .then(data => {
        
        let x = data[0].nextPhasesProductionBatch;
        if(x === undefined){
          return np;
        }else{
          np=x;

        }
        
      });

      return np;
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const newElements = [...elements];
    
    let dataSubmit = [];
    for (let h = 0; h < newElements.length; h++) {
      let type = newElements[h].type;
      const field = { type };

      switch (type) {
        case "select":
          field["field_value"] = document.getElementById(field.name + "Select1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "checkbox":
          field["field_value"] = event.target.checked;
          field["field_name"] = newElements[h].name;
          break;

        case "String":
          field["field_value"] = document.getElementById(field.name + "String1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Integer":
          field["field_value"] = document.getElementById(field.name + "Integer1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Employee":
          field["field_value"] = document.getElementById(field.name + "EmployeeID1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Place":
          field["field_value"] = document.getElementById(field.name + "PlaceID1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Vehicle":
          field["field_value"] =
            document.getElementById(field.name + "VehicleID1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Machine":
          field["field_value"] =
            document.getElementById(field.name + "MachineID1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Supplier":
          field["field_value"] =
            document.getElementById(field.name + "SupplierID1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Client":
          field["field_value"] =
            document.getElementById(field.name + "ClientID1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Material":
          field["field_value"] =
            document.getElementById(field.name + "MaterialID1").value;
          field["field_name"] = newElements[h].name;
          break;

        case "Product":
          field["field_value"] =
            document.getElementById(field.name + "ProductID1").value;
          field["field_name"] = newElements[h].name;
          break;

        default:
          // field["field_value"] = event.target.value;
          break;
      }
      dataSubmit.push(field);
      setElements(newElements);
    };
    let control = true;
    console.log(dataSubmit);
    for (let h = 0; h < dataSubmit.length; h++) {
      
      if (dataSubmit[h]["field_value"] == "") {
        control = false;
      }
    }
    if (control) {
      console.log(dataSubmit);
      storageToDB(dataSubmit);
      history('/tracking/visualizeTrackingPhase', { replace: true });
    }
    else{

      alert("Please fill all the data!");

    }

  };

  const storageToDB = (dataSubmit) => {

    let controlProduct = false;
    let controlProductionBatch = false;
    let controlMaterial = false;
    let allowedProduct = false;
    let allowedProductionBatch = false;
    let allowedMaterial = false;
    let historiesProduct = false;
    let historiesMaterial = false;
    let historiesProductionBatch = false;

    for (let j = 0; j < dataSubmit.length; j++) {

      switch (dataSubmit[j].type) {

        case "Product":
          controlProduct = true;
          break;
        case "Material":
          controlMaterial = true;
          break;
        case "ProductionBatch":
          controlProductionBatch = true;
          break;
      }

    }


    if (controlProduct) {
      let historyProduct = null;
      if (historiesJSON !== null) {
        for (let i = 0; i < historiesJSON.length; i++) {
          if (historiesJSON[i].jsonStructure !== undefined) {
            let data = JSON.parse(historiesJSON[i].jsonStructure);
            for (let h = 0; h < data.length; h++) {
              for (let k = 0; k < dataSubmit.length; k++) {
                if ((data[h].field_value === dataSubmit[k].field_value && data[h].type === "Product") && dataSubmit[k].type === "Product") {
                  let date1 = historiesJSON[i].date;
                  if (historyProduct === null || historyProduct < date1) {
                    historyProduct = date1;
                    historiesProduct = true;
                    let nextphases = getPhaseNextPhaseProduct(historiesJSON[i].phaseID);
                    console.log(nextphases);
                    for (let f = 0; f < nextphases.length; f++) {
                      if (nextphases[f].ID === phase.ID) {
                        allowedProduct = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (controlProductionBatch) {
      let historyProductionBatch = null;
      if (historiesJSON !== null) {
        for (let i = 0; i < historiesJSON.length; i++) {
          if (historiesJSON[i].jsonStructure !== undefined) {
            let data = JSON.parse(historiesJSON[i].jsonStructure);
            for (let h = 0; h < data.length; h++) {
              for (let k = 0; k < dataSubmit.length; k++) {
                if (data[h].field_value === dataSubmit[k].field_value && data[h].type === "ProductionBatch" && dataSubmit[k].type === "ProductionBatch") {
                  let date1 = historiesJSON[i].date;
                  if (historyProductionBatch === null || historyProductionBatch < date1) {
                    historyProductionBatch = historiesJSON[i];
                    historiesProductionBatch = true;
                    let nextphases = getPhaseNextPhaseProductionBatch(historiesJSON[i].phaseID);
                    for (let f = 0; f < nextphases.length; f++) {
                      if (nextphases[f].ID === phase.ID) {
                        allowedProductionBatch = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if (controlMaterial) {
      let historyMaterial = null;
      if (historiesJSON !== null) {
        for (let i = 0; i < historiesJSON.length; i++) {
          if (historiesJSON[i].jsonStructure !== undefined) {
            let data = JSON.parse(historiesJSON[i].jsonStructure);
            for (let h = 0; h < data.length; h++) {
              for (let k = 0; k < dataSubmit.length; k++) {
                if (data[h].field_value === dataSubmit[k].field_value && data[h].type === "Material" && dataSubmit[k].type === "Material") {
                  let date1 = historiesJSON[i].date;
                  if (historyMaterial === null || historyMaterial < date1) {
                    historyMaterial = historiesJSON[i];
                    historiesMaterial = true;
                    let nextphases = getPhaseNextPhaseMaterial(historiesJSON[i].phaseID);
                    for (let f = 0; f < nextphases.length; f++) {
                      if (nextphases[f].ID === phase.ID) {
                        allowedMaterial = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    if ((allowedProduct && historiesProduct) || (allowedMaterial && historiesMaterial) || (allowedProductionBatch && historiesProductionBatch) || (!historiesProduct && controlProduct) || (!historiesProductionBatch && controlProductionBatch) || (!historiesMaterial && controlMaterial) || (!controlProduct && !controlMaterial && !controlProductionBatch)) {

        let date_create = moment();
        let object = JSON.stringify({
          phaseID: phase.ID,
          jsonStructure: JSON.stringify(dataSubmit),
          date: date_create
        });

        let hash = sha256.create();
        hash.update(object);
        hash.hex();
     
        console.log(hash);
      fetch(variables.API_URL + 'phaserecord', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phaseID: phase.ID,
          jsonStructure: JSON.stringify(dataSubmit),
          date: date_create,
          hash: hash.toString(),
        })
      }).then(res => res.json())
        .then((result) => {
          alert("Success");
          console.log(result);
        }, (error) => {
          alert("Failed");
        });

    }else{
      alert("Incorrect flow of data!");
    }

  }
  return (
    <div className="Phase_container local-bootstrap">
      <div className='main-container'><h3>{phase.name}</h3>
      
      <form>
        {elements
          ? elements.map((field, i) => <Element key={i} field={field} />)
          : null}
        <Link to='/tracking/visualizeTrackingPhase'>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}

          >
            Submit
          </button>
        </Link>
      </form></div>
    </div>
  );
}

export default Phases;

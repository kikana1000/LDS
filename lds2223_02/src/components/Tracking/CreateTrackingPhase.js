import React, { useState, useEffect } from "react";
import "./CreateTrackingPhaseStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { variables } from '../Variables.js';

const CreateTrackingPhase = () => {

  useEffect(() => {

    refreshList();

  }, [])

  let history = useNavigate();
  const [items, setItems] = useState([]);
  const [phaseName, setPhaseName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputTypeValue] = useState("String");
  const [nextPhasesMaterial, setNextPhasesMaterial] = useState([]);
  const [inputNextPhaseMaterial, setInputNextPhaseMaterial] = useState("");
  const [nextPhasesProduct, setNextPhasesProduct] = useState([]);
  const [inputNextPhaseProduct, setInputNextPhaseProduct] = useState("");
  const [nextPhasesProductionBatch, setNextPhasesProductionBatch] = useState([]);
  const [inputNextPhaseProductionBatch, setInputNextPhaseProductionBatch] = useState("");
  const [possiblePhasesProductionBatch, setPossiblePhasesProductionBatch] = useState([]);
  const [possiblePhasesMaterial, setPossiblePhasesMaterial] = useState([]);
  const [possiblePhasesProduct, setPossiblePhasesProduct] = useState([]);

  const refreshList =()=>{

  fetch(variables.API_URL + 'phase')
    .then(response => response.json())
    .then(data => {
      
      setPossiblePhasesMaterial(data);
    setPossiblePhasesProduct(data);
    setPossiblePhasesProductionBatch(data);
    
    });
    
  }
   
  const handleAddButtonClick = () => {
    if (inputValue != "") {
      const newItem = {
        itemName: inputValue,
        type: inputType,
        isArray: false,
      };
      const newItems = [...items, newItem];

      setItems(newItems);
      setInputValue("");
      setInputTypeValue("String");
    }
    else {

      alert("Please fill all the data!");

    }
  };

  const remove = (index) => {
    setItems((current) => current.filter((item) => item !== current[index]));
  };

  const removeNextPhaseProductionBatch = (index) => {

    let phasesTemp = [...possiblePhasesProductionBatch];

    phasesTemp.push(nextPhasesProductionBatch[index]);

    setPossiblePhasesProductionBatch(phasesTemp);
    setNextPhasesProductionBatch((current) => current.filter((nextPhase) => nextPhase !== current[index]));
    setInputNextPhaseProductionBatch("");
  };

  const removeNextPhaseProduct = (index) => {

    let phasesTemp = [...possiblePhasesProduct];

    phasesTemp.push(nextPhasesProduct[index]);

    setPossiblePhasesProduct(phasesTemp);
    setNextPhasesProduct((current) => current.filter((nextPhase) => nextPhase !== current[index]));
    setInputNextPhaseProduct("");
  };

  const removeNextPhaseMaterial = (index) => {

    let phasesTemp = [...possiblePhasesMaterial];

    phasesTemp.push(nextPhasesMaterial[index]);

    setPossiblePhasesMaterial(phasesTemp);
    setNextPhasesMaterial((current) => current.filter((nextPhase) => nextPhase !== current[index]));
    setInputNextPhaseMaterial("");
  };

  const updateNewPhasesProductionBatch = () => {

    if (inputNextPhaseProductionBatch !== "") {

      let phasesTemp = [...nextPhasesProductionBatch];

      phasesTemp.push(possiblePhasesProductionBatch[inputNextPhaseProductionBatch]);
      setInputNextPhaseProductionBatch("");
      setNextPhasesProductionBatch(phasesTemp);
      setPossiblePhasesProductionBatch((current) => current.filter((possiblePhase) => possiblePhase !== current[inputNextPhaseProductionBatch]));
    } else {

      alert("Please fill all the data!");

    }
  }

  const updateNewPhasesProduct = () => {

    if (inputNextPhaseProduct !== "") {

      let phasesTemp = [...nextPhasesProduct];

      phasesTemp.push(possiblePhasesProduct[inputNextPhaseProduct]);
      setInputNextPhaseProduct("");
      setNextPhasesProduct(phasesTemp);
      setPossiblePhasesProduct((current) => current.filter((possiblePhase) => possiblePhase !== current[inputNextPhaseProduct]));
    } else {

      alert("Please fill all the data!");

    }
  }

  const updateNewPhasesMaterial = () => {

    if (inputNextPhaseMaterial !== "") {

      let phasesTemp = [...nextPhasesMaterial];

      phasesTemp.push(possiblePhasesMaterial[inputNextPhaseMaterial]);
      setInputNextPhaseMaterial("");
      setNextPhasesMaterial(phasesTemp);
      setPossiblePhasesMaterial((current) => current.filter((possiblePhase) => possiblePhase !== current[inputNextPhaseMaterial]));
    } else {

      alert("Please fill all the data!");

    }
  }

  const storeDataInDatabase = () => {
    if (phaseName != "" && items.length > 0) {
      const data = convertDataToJSON();
      const nextPhasesProductA = [];
      const nextPhasesProductionBatchA = [];
      const nextPhasesMaterialA = [];

      for(let i=0;i<nextPhasesProduct.length;i++){
        nextPhasesProductA[i] = nextPhasesProduct[i].ID;
      }
      const nextPhasesProductJSON = JSON.stringify(nextPhasesProduct);
      for(let i=0;i<nextPhasesProductionBatch.length;i++){
        nextPhasesProductionBatchA[i] = nextPhasesProductionBatch[i].ID;
      }
      const nextPhasesProductionBatchJSON = JSON.stringify(nextPhasesProductionBatch);
      for(let i=0;i<nextPhasesMaterial.length;i++){
        nextPhasesMaterialA[i] = nextPhasesMaterial[i].ID;
      }
      const nextPhasesMaterialJSON = JSON.stringify(nextPhasesMaterial);

      fetch(variables.API_URL + 'phase', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: phaseName,
          jsonStructure: data,
          nextPhasesProduct: nextPhasesProductJSON,
          nextPhasesMaterial: nextPhasesMaterialJSON,
          nextPhasesProductionBatch: nextPhasesProductionBatchJSON,

        })
      }).then(res => res.json())
        .then((result) => {
          alert("Success");

          setPhaseName("");
          setItems([]);
          setInputTypeValue("String");
          setInputValue("");
          setInputNextPhaseProductionBatch("");
          setNextPhasesProductionBatch([]);
          setInputNextPhaseProduct("");
          setNextPhasesProduct([]);
          setInputNextPhaseMaterial("");
          setNextPhasesMaterial([]);
        }, (error) => {
          alert("Failed");
        });


      history('/tracking/addTrackingPhase', { replace: true });

    } else {

      alert("Please fill all the data!");

    }
  };

  const convertDataToJSON = () => {
    const itemsJson = [];

    for (let i = 0; i < items.length; i++) {
      const item = {};
      item.name = items[i].itemName;
      item.type = items[i].type;
      item.isArray = items[i].isArray;

      itemsJson.push(item);
    }

    const myObjStr = JSON.stringify(itemsJson);

    return myObjStr;
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            className="add-item-input"
            value={phaseName}
            onChange={(event) => setPhaseName(event.target.value)}
            placeholder="Choose the name for the tracking phase"
          />
        </div>
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Field name"
          />

          <select
            value={inputType}
            onChange={(event) => setInputTypeValue(event.target.value)}
          >
            <option value="String">String</option>
            <option value="Int">Integer</option>
            <option value="Employee">Employee</option>
            <option value="Place">Place</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Machine">Machine</option>
            <option value="Supplier">Supplier</option>
            <option value="Client">Client</option>
            <option value="Material">Material</option>
            <option value="Product">Product</option>
          </select>
        </div>
        <div className="add-item-box btn btn-primary but-b" onClick={() => handleAddButtonClick()}>
          <FontAwesomeIcon icon={faPlus} /> Add Field
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name">
                <>
                  <FontAwesomeIcon icon={faCircle} />
                  <span>{item.itemName}</span>
                </>
              </div>
              <div className="item-name">
                <span>{item.type}</span>
              </div>
              <div className="item-name deleteButton" onClick={() => remove(index)}><FontAwesomeIcon icon={faTrash} /></div>
            </div>
          ))}
        </div>

        <div className="add-item-box">
          <select
            value={inputNextPhaseProduct}
            onChange={(event) => setInputNextPhaseProduct(event.target.value)}
          >
            <option value="" disabled >--Please choose an option--</option>
            {possiblePhasesProduct.length > 0 && possiblePhasesProduct.map((option, i) =>
              <option value={i} key={i}>{option.name}</option>

            )}
          </select>
        </div>
        <div className="add-item-box btn btn-primary but-b" onClick={() => updateNewPhasesProduct()}>
          <FontAwesomeIcon icon={faPlus} /> Add Next Phase for Product
        </div>
        <div className="item-list">
          {nextPhasesProduct.map((phase, index) => (
            <div className="item-container">
              <div className="item-name">
                <>
                  <FontAwesomeIcon icon={faCircle} />
                  <span>{phase.name}</span>
                </>
              </div>
              <div className="item-name deleteButton" onClick={() => removeNextPhaseProduct(index)}><FontAwesomeIcon icon={faTrash} /></div>
            </div>
          ))}
        </div>

        <div className="add-item-box">
          <select
            value={inputNextPhaseMaterial}
            onChange={(event) => setInputNextPhaseMaterial(event.target.value)}
          >
            <option value="" disabled >--Please choose an option--</option>
            {possiblePhasesMaterial.length > 0 && possiblePhasesMaterial.map((option, i) =>
              <option value={i} key={i}>{option.name}</option>

            )}
          </select>
        </div>
        <div className="add-item-box btn btn-primary but-b" onClick={() => updateNewPhasesMaterial()}>
          <FontAwesomeIcon icon={faPlus} /> Add Next Phase for Materials
        </div>
        <div className="item-list">
          {nextPhasesMaterial.map((phase, index) => (
            <div className="item-container">
              <div className="item-name">
                <>
                  <FontAwesomeIcon icon={faCircle} />
                  <span>{phase.name}</span>
                </>
              </div>
              <div className="item-name deleteButton" onClick={() => removeNextPhaseMaterial(index)}><FontAwesomeIcon icon={faTrash} /></div>
            </div>
          ))}
        </div>

        <div className="add-item-box">
          <select
            value={inputNextPhaseProductionBatch}
            onChange={(event) => setInputNextPhaseProductionBatch(event.target.value)}
          >
            <option value="" disabled >--Please choose an option--</option>
            {possiblePhasesProductionBatch.length > 0 && possiblePhasesProductionBatch.map((option, i) =>
              <option value={i} key={i}>{option.name}</option>

            )}
          </select>
        </div>
        <div className="add-item-box btn btn-primary but-b" onClick={() => updateNewPhasesProductionBatch()}>
          <FontAwesomeIcon icon={faPlus} /> Add Next Phase for Production Batch
        </div>
        <div className="item-list">
          {nextPhasesProductionBatch.map((phase, index) => (
            <div className="item-container">
              <div className="item-name">
                <>
                  <FontAwesomeIcon icon={faCircle} />
                  <span>{phase.name}</span>
                </>
              </div>
              <div className="item-name deleteButton" onClick={() => removeNextPhaseProductionBatch(index)}><FontAwesomeIcon icon={faTrash} /></div>
            </div>
          ))}
        </div>

        <div className="add-item-box saveButton" onClick={() => storeDataInDatabase()}>
          <FontAwesomeIcon icon={faPlus} /> ADD PHASE
        </div>
      </div>
    </div>
  );
};

export default CreateTrackingPhase;

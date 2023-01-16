import { Table, PopupInfo } from "../../../components";
import { Tools, Plus} from "react-bootstrap-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import { variables } from '../../../components/Variables.js';
import React, { useState, Component } from "react";
import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";
import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";


export class ProductionBatch extends Component {

  buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            productionBatches: []
        }

        this.productionBatchesType = {
            types: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'productionbatch')
            .then(response => response.json())
            .then(data => {
                this.setState({
                  productionBatches: data
                });
            });


        fetch(variables.API_URL + 'productionbatchstate')
            .then(response => response.json())
            .then(data => {
                this.productionBatchesType = {
                    types: data
                }
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createProductionBatch(s) {

        console.log(s);

        fetch(variables.API_URL + 'productionbatch', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reference: s.reference,
                stateID: s.stateID,

            })
        }).then(res => res.json())
            .then((result) => {
                alert("Success");
                this.refreshList();
            }, (error) => {
                alert("Failed");
            });
    }

    updateProductionBatch(s) {

        fetch(variables.API_URL + 'productionbatch', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: s.ID,
                reference: s.reference,
                stateID: s.stateID,

            })
        }).then(res => res.json())
            .then((result) => {
                alert("Success");
                this.refreshList();
            }, (error) => {
                alert("Failed");
            });
    }

    render() {

        let { productionBatches } = this.state;
        let { types } = this.productionBatchesType;

        const createProductionBatchs = (s) => {

            this.createProductionBatch(s);

        }

        const editProductionBatch = (s) => {

            this.updateProductionBatch(s);

        }

        const setButtonPopupAdd = (e) => {

            this.buttonPopupAdd = e;
            this.forceUpdate();

        };

        const setButtonPopupEdit = (e) => {

            this.buttonPopupEdit = e;
            this.forceUpdate();
        };

        const setButtonPopupInfo = (e) => {

            this.buttonPopupInfo = e;
            this.forceUpdate();
        };

        const setElementEdit = (e) => {

            this.elementEdit = e;
        };

        const setElementInfo = (e) => {

            this.elementInfo = e;
        };

        const infoToShow = ["reference", "stateID"];

  return (
    <div className="local-bootstrap container font gap-3 ">
      <div className="productionBatch_list">
        <div className="mx-3">
          <h1 className="p-3 text-center">
            {" "}
            <FontAwesomeIcon  icon={faBoxesStacked}  size={"lg"} />{" "}
            Production Batch
          </h1>
          <div className="button-add">
            <button
              className="btn btn-outline-success"
              onClick={() => setButtonPopupAdd(true)}
            >
              Add Production Batch
              <Plus color="green" className="btn-icon" />
            </button>
          </div>

          <Table
            infoToShow={infoToShow}
            data={productionBatches}
            //setButtonSecondInfo={(e) => setButtonSecondInfo(e)}
            setElementInfo={(e) => setElementInfo(e)}
            setElementEdit={(e) => setElementEdit(e)}
            setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
            setButtonPopupInfo={(e) => setButtonPopupInfo(e)}

          />
          <PopupAdd
            productionBatchTypes={types}
            productionBatches={productionBatches}
            setElementList={ (e)=> createProductionBatchs(e)}
            trigger={this.buttonPopupAdd}
            setTrigger={setButtonPopupAdd}
          ></PopupAdd>
          <PopupEdit
          productionBatchTypes={types}
            productionBatch={this.elementEdit}
            setElementEdit={setElementEdit}
            productionBatches={productionBatches}
            setProductionBatches={(e)=> editProductionBatch(e)}
            trigger={this.buttonPopupEdit}
            setTrigger={setButtonPopupEdit}
          ></PopupEdit>
          <PopupInfo
            headData={infoToShow}
            data={this.elementInfo}
            trigger={this.buttonPopupInfo}
            setTrigger={setButtonPopupInfo}
          ></PopupInfo>
        </div>
      </div>
    </div>
  );
    }
}



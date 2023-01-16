import { Table, PopupInfo } from "../../../components";
import { Tools, Plus } from "react-bootstrap-icons";
import React, { useState, Component } from "react";import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";
import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";
import { variables } from '../../../components/Variables.js';


export class Machine extends Component {

  buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            machines: []
        }

        this.establishmentsList = {
            list: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'machine')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    machines: data
                });
            });


        fetch(variables.API_URL + 'establishment')
            .then(response => response.json())
            .then(data => {
                this.establishmentsList = {
                    list: data
                }
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createMachine(s) {

        fetch(variables.API_URL + 'machine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: s.name,
                establishmentID: s.establishmentID,
                aquisitionYear: s.aquisitionYear,
                functionMachine: s.functionMachine,
                isActive: s.isActive,

            })
        }).then(res => res.json())
            .then((result) => {
                alert("Success");
                this.refreshList();
            }, (error) => {
                alert("Failed");
            });
    }

    updateMachine(s) {

        fetch(variables.API_URL + 'machine', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: s.ID,
                name: s.name,
                establishmentID: s.establishmentID,
                aquisitionYear: s.aquisitionYear,
                functionMachine: s.functionMachine,
                isActive: s.isActive,
            })
        }).then(res => res.json())
            .then((result) => {
                alert("Success");
                this.refreshList();
            }, (error) => {
                alert("Failed");
            });
    }

    deactiveMachine(id) {

        fetch(variables.API_URL + 'machine/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: id,
                isActive: false,

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

        let { machines } = this.state;
        let { list } = this.establishmentsList;

        console.log(list);

        const createMachines = (s) => {

            this.createMachine(s);

        }

        const editMachine = (s) => {

            this.updateMachine(s);

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

        const infoToShow = ["name", "establishmentID","functionMachine"];

        const remove = (e) => {
            const ID = e.ID;
            this.deactiveMachine(ID);
        };


  return (
    <div className="local-bootstrap container font gap-3 ">
      <div className="production-machine-list">
        <div className="mx-3">
          <h1 className="p-3 text-center">
            {" "}
            <Tools className="header-icon" fontSize={"x-large"} />
            Production Machine
          </h1>
          <div className="button-add">
            <button
              className="btn btn-outline-success"
              onClick={() => setButtonPopupAdd(true)}
            >
              Add Production Machine
              <Plus color="green" className="btn-icon" />
            </button>
          </div>
          <Table
            infoToShow={infoToShow}
            dataHeader={"Establishment"}
            data={machines}
            //findIdInData={getEstablishmentById}
            // setButtonSecondInfo={(e) => setButtonSecondInfo(e)}
            setElementInfo={(e) => setElementInfo(e)}
            setElementEdit={(e) => setElementEdit(e)}
            setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
            setButtonPopupInfo={(e) => setButtonPopupInfo(e)}
            remove={(e) => remove(e)}
          />
          <PopupAdd
            establishmentList={list}
            machines={machines}
            setElementList={(e) => createMachines(e)}
            trigger={this.buttonPopupAdd}
            setTrigger={setButtonPopupAdd}
          ></PopupAdd>
          <PopupEdit
           establishmentList={list}
            machine={this.elementEdit}
            setElementEdit={setElementEdit}
            machines={machines}
            setProductionMachine={(e) => editMachine(e)}
            trigger={this.buttonPopupEdit}
            setTrigger={setButtonPopupEdit}
          ></PopupEdit>
          <PopupInfo
            headData={["name", "establishmentID", "aquisitionYear", "functionMachine","isActive"]}
            data={this.elementInfo}
            trigger={this.buttonPopupInfo}
            setTrigger={setButtonPopupInfo}
            ></PopupInfo>
            <PopupInfo
              headData={["Name", "Address", "Type", "Active"]}
              data={this.elementInfo}
              //trigger={buttonSecondInfo}
              //setTrigger={setButtonSecondInfo}
            ></PopupInfo>
        </div>
      </div>
    </div>
  );
    }
}

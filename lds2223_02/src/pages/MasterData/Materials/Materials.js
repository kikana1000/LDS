import { Table, PopupInfo } from "../../../components";
import { Plus } from "react-bootstrap-icons";
import React, { useState, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";
import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";
import { variables } from '../../../components/Variables.js';


export class Material extends Component {

  buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            materials: []
        }

    }

    refreshList() {
        fetch(variables.API_URL + 'material')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    materials: data
                });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createMaterials(s) {

        fetch(variables.API_URL + 'material', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: s.name,
                reference: s.reference,
                description:s.description,

            })
        }).then(res => res.json())
            .then((result) => {
                alert("Success");
                this.refreshList();
            }, (error) => {
                alert("Failed");
            });
    }

    updateMaterial(s) {

        fetch(variables.API_URL + 'material', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: s.ID,
                name: s.name,
                reference: s.reference,
                description:s.description,

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

        let { materials } = this.state;

        const createMaterials = (s) => {

            this.createMaterials(s);

        }

        const editMaterial = (s) => {

            this.updateMaterial(s);

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

        const infoToShow = ["name", "reference"];

  return (
    
    <div className="suppliers_list">
    <div className="local-bootstrap container font gap-3 ">
        <div className="mx-3">
          <h1 className="p-3 text-center">
            {" "}
            <FontAwesomeIcon icon={faWrench} />
            Material
          </h1>
          <div className="button-add">
            <button
              className="btn btn-outline-success d-flex justify-content-start btn-add"
              onClick={() => setButtonPopupAdd(true)}
            >
              Add material
              <Plus color="green" className="btn-icon" />
            </button>
          </div>
          <Table
            infoToShow={infoToShow}
            data={materials}
            setElementInfo={(e) => setElementInfo(e)}
            setElementEdit={(e) => setElementEdit(e)}
            setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
            setButtonPopupInfo={(e) => setButtonPopupInfo(e)}
          />
          <PopupAdd
            materials={materials}
            setMaterials={(e) => createMaterials(e)}
            trigger={this.buttonPopupAdd}
            setTrigger={setButtonPopupAdd}
          ></PopupAdd>
          <PopupEdit
            material={this.elementEdit}
            setMaterial={setElementEdit}
            materials={materials}
            setMaterials={(e) => editMaterial(e)}
            trigger={this.buttonPopupEdit}
            setTrigger={setButtonPopupEdit}
          ></PopupEdit>
          <PopupInfo
            headData={["name", "reference", "description"]}
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


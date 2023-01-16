import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";
import { Table, PopupInfo } from "../../../components";
import { variables } from '../../../components/Variables.js';
import { BuildingAdd, Building } from "react-bootstrap-icons";
import React, { useState, Component } from "react";
import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";

export class Establishment extends Component {

    buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            establishments: []
        }

        this.establishmentsType = {
            types: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'establishment')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    establishments: data
                });
            });


        fetch(variables.API_URL + 'establishmentType')
            .then(response => response.json())
            .then(data => {
                this.establishmentsType = {
                    types: data
                }
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createEstablishment(s) {

        

        fetch(variables.API_URL + 'establishment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: s.name,
                typeID: s.typeID,
                address: s.address,
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

    updateEstablishment(s) {

        fetch(variables.API_URL + 'establishment', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: s.ID,
                name: s.name,
                typeID: s.typeID,
                address: s.address,
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

    deactiveEstablishment(id) {

        fetch(variables.API_URL + 'establishment/' + id, {
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

        let { establishments } = this.state;
        let { types } = this.establishmentsType;

        console.log(this.establishmentsType);

        const createEstablishments = (s) => {

            this.createEstablishment(s);

        }

        const editEstablishment = (s) => {

            this.updateEstablishment(s);

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

        const infoToShow = ["name", "address"];

        const remove = (e) => {
            const ID = e.ID;
            this.deactiveEstablishment(ID);
        };

        return (
            <div className="establishment-list">
                <div className="local-bootstrap container font gap-3 ">

                    <div className="mx-3">
                        <h1 className="p-3 text-center">
                            {" "}
                            <Building className="header-icon" fontSize={"x-large"} />
                            Establishment
                        </h1>
                        <div className="button-add">
                            <button
                                className="btn btn-outline-success d-flex justify-content-start btn-add"
                                onClick={() => setButtonPopupAdd(true)}
                            >
                                Add Establishment{" "}
                                <BuildingAdd color="green" className="btn-icon" />
                            </button>
                        </div>
                        <Table
                            infoToShow={infoToShow}
                            data={establishments}
                            setButtonPopupInfo={(e) => setButtonPopupInfo(e)}
                            setElementInfo={(e) => setElementInfo(e)}
                            setElementEdit={(e) => setElementEdit(e)}
                            setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
                            remove={(e) => remove(e)}
                        ></Table>
                        <PopupInfo
                            headData={["name", "address", "typeID", "isActive"]}
                            data={this.elementInfo}
                            trigger={this.buttonPopupInfo}
                            setTrigger={setButtonPopupInfo}
                        ></PopupInfo>
                        <PopupAdd establishmentsType={types} establishments={establishments} setEstablishments={(e) => createEstablishments(e)} trigger={this.buttonPopupAdd} setTrigger={setButtonPopupAdd}>
                        </PopupAdd>
                        <PopupEdit establishmentsType={types} establishment={this.elementEdit} setElementEdit={setElementEdit} establishments={establishments} setEstablishments={(e) => editEstablishment(e)} trigger={this.buttonPopupEdit} setTrigger={setButtonPopupEdit}>
                        </PopupEdit>
                    </div>
                </div>
            </div>
        );
    }
};



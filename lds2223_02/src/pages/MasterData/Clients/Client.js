import { variables } from '../../../components/Variables.js';
import Table from "../../../components/Table/Table.js";
import PopupInfo from "../../../components/Popup/PopupInfo";
import { PersonAdd, PersonVideo } from "react-bootstrap-icons";
import React, { useState, Component } from "react";
import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";
import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";

export class Client extends Component {

    buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            clients: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'client')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    clients: data
                });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createClient(s){

        console.log(s);

        fetch(variables.API_URL+'client',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body :JSON.stringify({
                name:s.name,
                nif:s.nif,
                phone:s.phone,
                address:s.address,
                email:s.email,
                
            })
        }).then(res=>res.json())
        .then((result)=>{
            alert("Success");
            this.refreshList();
        },(error)=>{
            alert("Failed");
        });
    }

    updateClient(s){


        fetch(variables.API_URL+'client',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body :JSON.stringify({
                ID:s.ID,
                name:s.name,
                nif:s.nif,
                phone:s.phone,
                address:s.address,
                email:s.email,

            })
        }).then(res=>res.json())
        .then((result)=>{
            alert("Success");
            this.refreshList();
        },(error)=>{
            alert("Failed");
        });
    }

    render() {

        let { clients } = this.state;

        const createClient = (s) => {

            this.createClient(s);

        }

        const editClients = (s) => {

            console.log(s);

            this.updateClient(s);

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

        const infoToShow = ["name", "email", "nif", "phone"];


        return (
            <div className="local-bootstrap container font gap-3 ">
                <div className="mx-3">
                    <h1 className="p-3 text-center">
                        {" "}
                        <PersonVideo className="header-icon" fontSize={"x-large"} />
                        Clients
                    </h1>
                    <div className="button-add">
                        <button
                            className="btn btn-outline-success d-flex justify-content-start btn-add"
                            onClick={() => setButtonPopupAdd(true)}
                        >
                            Add client
                            <PersonAdd color="green" className="btn-icon" />
                        </button>
                    </div>
                    <Table
                        infoToShow={infoToShow}
                        data={clients}
                        setElementInfo={(e) => setElementInfo(e)}
                        setElementEdit={(e) => setElementEdit(e)}
                        setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
                        setButtonPopupInfo={(e) => setButtonPopupInfo(e)}
                    />
                    <PopupAdd
                        clients={clients}
                        setClients={(e) => createClient(e)}
                        trigger={this.buttonPopupAdd}
                        setTrigger={setButtonPopupAdd}
                    ></PopupAdd>
                    <PopupEdit
                        client={this.elementEdit}
                        setClient={setElementEdit}
                        clients={clients}
                        setClients={(e) => editClients(e)}
                        trigger={this.buttonPopupEdit}
                        setTrigger={setButtonPopupEdit}
                    ></PopupEdit>
                    <PopupInfo
                        headData={["name", "email", "nif", "phone", "address"]}
                        data={this.elementInfo}
                        trigger={this.buttonPopupInfo}
                        setTrigger={setButtonPopupInfo}
                    ></PopupInfo>
                </div>
            </div>
        );
    }

}
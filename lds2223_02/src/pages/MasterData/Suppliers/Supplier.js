import { variables } from '../../../components/Variables.js';
import {Table,PopupInfo} from "../../../components";
import { Box, Plus } from "react-bootstrap-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly } from '@fortawesome/free-solid-svg-icons';
import React, { useState, Component } from "react";
import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";
import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";

export class Supplier extends Component {

    buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            suppliers: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'supplier')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    suppliers: data
                });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createSupplier(s){

        fetch(variables.API_URL+'supplier',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body :JSON.stringify({
                name:s.name,
                email:s.email,
                phone:s.phone,
                address:s.address,
                description:s.description,
                isActive:s.isActive,

            })
        }).then(res=>res.json())
        .then((result)=>{
            alert("Success");
            this.refreshList();
        },(error)=>{
            alert("Failed");
        });
    }

    updateSupplier(s){

        fetch(variables.API_URL+'supplier',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body :JSON.stringify({
                ID:s.ID,
                name:s.name,
                email:s.email,
                phone:s.phone,
                address:s.address,
                description:s.description,
                isActive:s.isActive,

            })
        }).then(res=>res.json())
        .then((result)=>{
            alert("Success");
            this.refreshList();
        },(error)=>{
            alert("Failed");
        });
    }

     deactiveSupplier(id){

        fetch(variables.API_URL+'supplier/'+id,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body :JSON.stringify({
                ID:id,
                isActive:false,

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

        let { suppliers } = this.state;

        const createSuppliers = (s) => {

            this.createSupplier(s);

        }

        const editSuppliers = (s) => {

            this.updateSupplier(s);

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

        const infoToShow = ["name", "email", "phone"];

        const remove = (e) => {
            const ID = e.ID;
            this.deactiveSupplier(ID);
        };

        return (
            <div className="local-bootstrap container font gap-3 ">
                <div className="suppliers_list">
                    <div className="mx-3">
                        <h1 className="p-3 text-center">
                            {" "}
                            <FontAwesomeIcon icon={faDolly} size={"lg"} />{" "}
                            Supplier
                        </h1>

                        <div className="button-add">
                            <button
                                className="btn btn-outline-success"
                                onClick={() => setButtonPopupAdd(true)}
                            >
                                Add Supplier
                                <Plus color="green" className="btn-icon" />
                            </button>
                        </div>

                        <Table
                            infoToShow={infoToShow}
                            data={suppliers}
                            setElementInfo={(e) => setElementInfo(e)}
                            setElementEdit={(e) => setElementEdit(e)}
                            setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
                            setButtonPopupInfo={(e) => setButtonPopupInfo(e)}
                            remove={(e) => remove(e)}
                        />
                        <PopupAdd
                            suppliers={suppliers}
                            trigger={this.buttonPopupAdd}
                            setTrigger={setButtonPopupAdd}
                            setSuppliers={(e) => createSuppliers(e)}
                        ></PopupAdd>
                        <PopupEdit
                            supplier={this.elementEdit}
                            setSupplier={setElementEdit}
                            suppliers={suppliers}
                            setSuppliers={(e) => editSuppliers(e)}
                            trigger={this.buttonPopupEdit}
                            setTrigger={setButtonPopupEdit}
                        ></PopupEdit>
                        <PopupInfo
                            headData={[
                                "name",
                                "email",
                                "phone",
                                "description",
                                "address",
                                "isActive",
                            ]}
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
import { variables } from '../../../components/Variables.js';
import { Table, PopupInfo } from "../../../components";
import { Plus } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';
import PopupAdd from './PopupAdd';
import PopupEdit from './PopupEdit';
import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";

export class Vehicle extends Component {

    buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            vehicles: []
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'vehicle')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    vehicles: data
                });
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createVehicle(s) {

        fetch(variables.API_URL + 'vehicle', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                licensePlate: s.licensePlate,
                description: s.description,
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

    updateVehicle(s) {

        console.log(s);

        fetch(variables.API_URL + 'vehicle', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: s.ID,
                description: s.description,
                licensePlate: s.licensePlate,
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

    deactiveVehicle(id) {

        fetch(variables.API_URL + 'vehicle/' + id, {
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

        let { vehicles } = this.state;

        const createVehicles = (s) => {

            this.createVehicle(s);

        }

        const editVehicles = (s) => {

            console.log(s);

            this.updateVehicle(s);

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

        const infoToShow = ['description', 'licensePlate']

        const remove = (e) => {
            const ID = e.ID;
            this.deactiveVehicle(ID);
        };


        return (
            <div className="local-bootstrap container font gap-3 ">
                <div className="suppliers_list">
                    <div className='mx-3'>
                        <h1 className="p-3 text-center"> <FontAwesomeIcon icon={faTruck} className='header-icon' />Vehicle</h1>
                        <div className="button-add">
                            <button className='btn btn-outline-success d-flex justify-content-start btn-add' onClick={() => setButtonPopupAdd(true)}>Add Vehicle<Plus color='green' className="btn-icon" /></button>
                        </div>
                        <Table infoToShow={infoToShow} data={vehicles} setElementInfo={(e) => setElementInfo(e)} setElementEdit={(e) => setElementEdit(e)} setButtonPopupEdit={(e) => setButtonPopupEdit(e)} setButtonPopupInfo={(e) => setButtonPopupInfo(e)} remove={(e) => remove(e)} />
                        <PopupAdd vehicles={vehicles} setVehicles={(e) => createVehicles(e)} trigger={this.buttonPopupAdd} setTrigger={setButtonPopupAdd}>
                        </PopupAdd>
                        <PopupEdit vehicle={this.elementEdit} setVehicle={setElementEdit} vehicles={vehicles} setVehicles={(e) => editVehicles(e)} trigger={this.buttonPopupEdit} setTrigger={setButtonPopupEdit}>
                        </PopupEdit>
                        <PopupInfo headData={["licensePlate", "description", "isActive"]} data={this.elementInfo} trigger={this.buttonPopupInfo} setTrigger={setButtonPopupInfo}>
                        </PopupInfo>
                    </div>
                </div>
            </div>
        );
    }

}
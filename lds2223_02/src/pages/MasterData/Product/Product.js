import "../../MasterData/styles.scss";
import "../../MasterData/MasterDataStyle.css";
import { Table, PopupInfo } from "../../../components";
import { UpcScan, BuildingAdd } from "react-bootstrap-icons";
import React, { useState, Component } from "react";
import PopupAdd from "./PopupAdd";
import PopupEdit from "./PopupEdit";
import { variables } from '../../../components/Variables.js';

export class Product extends Component {
  
  buttonPopupAdd = false;
    buttonPopupEdit = false;
    buttonPopupInfo = false;
    elementInfo = null;
    elementEdit = null;

    constructor(props) {

        super(props);

        this.state = {
            products: []
        }

        this.productsType = {
            types: []
        }

        this.productionBatches = {
          batches: []
      }
    }

    refreshList() {
        fetch(variables.API_URL + 'product')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    products: data
                });
            });


        fetch(variables.API_URL + 'productstate')
            .then(response => response.json())
            .then(data => {
                this.productsType = {
                    types: data
                }
            });

            fetch(variables.API_URL + 'productionbatch')
            .then(response => response.json())
            .then(data => {
                this.productionBatches = {
                    batches: data
                }
            });

    }

    componentDidMount() {
        this.refreshList();
    }

    createProduct(s) {

        fetch(variables.API_URL + 'product', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: s.name,
                reference: s.reference,
                description: s.description,
                stateID: s.stateID,
                productionBatchID : s.productionBatchID

            })
        }).then(res => res.json())
            .then((result) => {
                alert("Success");
                this.refreshList();
            }, (error) => {
                alert("Failed");
            });
    }

    updateProduct(s) {

        fetch(variables.API_URL + 'product', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ID: s.ID,
                name: s.name,
                reference: s.reference,
                description: s.description,
                stateID: s.stateID,
                productionBatchID : s.productionBatchID

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

        let { products } = this.state;
        let { types } = this.productsType;
        let {batches} = this.productionBatches

        const createProducts = (s) => {

            this.createProduct(s);

        }

        const editProduct = (s) => {

            this.updateProduct(s);

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
    <div className="establishment-list">
      <div className="local-bootstrap container font gap-3 ">
        <div className="mx-3">
          <h1 className="p-3 text-center">
            {" "}
            <UpcScan className="header-icon" /> Product
          </h1>
          <div className="button-add">
            <button
              className="btn btn-outline-success d-flex justify-content-start btn-add"
              onClick={() => setButtonPopupAdd(true)}
            >
              Add Product <BuildingAdd color="green" className="btn-icon" />
            </button>
          </div>
          <Table
            infoToShow={infoToShow}
            data={products}
            setButtonPopupInfo={(e) => setButtonPopupInfo(e)}
            setElementInfo={(e) => setElementInfo(e)}
            setElementEdit={(e) => setElementEdit(e)}
            setButtonPopupEdit={(e) => setButtonPopupEdit(e)}
          ></Table>
          <PopupInfo
            headData={["name", "description", "productionBatchID"]}
            data={this.elementInfo}
            trigger={this.buttonPopupInfo}
            setTrigger={setButtonPopupInfo}
          ></PopupInfo>
          <PopupAdd
            productsType={types}
            productionBatches = {batches}
            products={products}
            setProducts={(e)=>createProducts(e)}
            trigger={this.buttonPopupAdd}
            setTrigger={setButtonPopupAdd}
          ></PopupAdd>
          <PopupEdit
            product={this.elementEdit}
            setElementEdit={setElementEdit}
            productsType={types}
            productionBatches = {batches}
            products={products}
            setProducts={(e) => editProduct(e)}
            trigger={this.buttonPopupEdit}
            setTrigger={setButtonPopupEdit}
          ></PopupEdit>
        </div>
      </div>
    </div>
  );
    }
};


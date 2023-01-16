import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, GearFill, PersonFillGear } from 'react-bootstrap-icons';
import '../../../components/Popup/Popup.css'
import { Button } from 'react-bootstrap';
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

function PopupEdit(props) {
    
    const schema = yup.object().shape({
        name: yup.string().required(validationMessage.required),
        nif: yup.string().matches(validationPatterns.number, validationMessage.number).min(9, validationMessage.nif).max(9, validationMessage.nif).required(validationMessage.required),
        phone: yup.string().matches(validationPatterns.phone, validationMessage.phone).required(validationMessage.required),
        email: yup.string().email(validationMessage.email).required(validationMessage.required),
        address: yup.string().max(120, validationMessage.max120).required(validationMessage.required),
    })

    const [firstTime, setFirstTime] = useState(true);
    const loadvalues = () => {
        if (props.client != null && firstTime === true) {
            setValue("nif", props.client.nif)
            setValue("phone", props.client.phone)
            setValue("name", props.client.name);
            setValue("email", props.client.email);
            setValue("address", props.client.address)
            setFirstTime(false)
        }
    }

    useEffect(() => loadvalues())

    const handleclose = () => {
        props.setTrigger(false)
        reset()
        setFirstTime(true)
        props.setClient(null)
    }

    const {
        handleSubmit, register, reset, setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const newClient = {
            ID: props.client.ID, name: data.name, email: data.email, nif: data.nif, phone: data.phone, address: data.address
        }
        console.log(newClient);
        props.setClients(newClient);
        handleclose();
    }

    const x = () => {

        alert("botao funfa");
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className='modal-title mx-auto' > <PersonFillGear className="header-icon-popup" fontSize={"x-large"} /> Edit Client</h3>
                        <X className='btn-close' fontSize={"x-large"} cursor="pointer" color='black' onClick={() => handleclose()} />
                    </div>
                    <hr />
                    <form className="form-popup" onSubmit={handleSubmit(onSubmit)}> <div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="name">Name: </label>
                            <div className="col-sm-9">
                                <input type="text" id="name" className="form-control form-control-sm" placeholder="Full Name" {...register("name")} required />
                                <small className='error'>{errors.name?.message}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="email">Email: </label>
                            <div className="col-sm-9">
                                <input type="email" id="email" className="form-control form-control-sm" placeholder="Email" {...register("email")} required />
                                <small className='error'>{errors.email?.message}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="phone">Telephone: </label>
                            <div className="col-sm-9">
                                <input type="tel" id="phone" className="form-control form-control-sm" placeholder="91XXXXXXX"  {...register("phone")} required />
                                <small className='error'>{errors.phone?.message}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="nif">Nif: </label>
                            <div className="col-sm-9">
                                <input type="text" id="nif" className="form-control form-control-sm" placeholder="NIF" {...register("nif")} required />
                                <small className='error'>{errors.nif?.message}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="address">Address: </label>
                            <div className="col-sm-9">
                                <textarea className="form-control  form-control-sm form_textArea" type="text" id="address" placeholder="Address" {...register("address")} required />
                                <small className='error'>{errors.address?.message}</small>
                            </div>
                        </div>
                    </div>
                        <div className="footer">
                            <Button type='submit' variant="dark" onClick={handleSubmit(onSubmit)}> Edit Client <GearFill className='btn-icon' /></Button>
                        </div>
                    </form>
                    {props.children}
                </div>
            </div>
        </div>
    ) : ""
}
export default PopupEdit;
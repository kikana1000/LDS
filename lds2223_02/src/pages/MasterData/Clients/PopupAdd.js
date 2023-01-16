import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X, PersonAdd } from 'react-bootstrap-icons';
import '../../../components/Popup/Popup.css'
import { Button } from 'react-bootstrap';
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"


function PopupAdd(props) {
    const schema = yup.object().shape({
        name: yup.string().required(validationMessage.required),
        nif: yup.string().matches(validationPatterns.number, validationMessage.number).min(9, validationMessage.nif).max(9, validationMessage.nif).required(validationMessage.required),
        phone: yup.string().matches(validationPatterns.phone, validationMessage.phoneNumber).required(validationMessage.required),
        email: yup.string().email(validationMessage.email).required(validationMessage.required),
        address: yup.string().max(120, validationMessage.max120).required(validationMessage.required),
    })
    const handleclose = () => {
        props.setTrigger(false)
        reset()
    }

    const  {
        handleSubmit, register,reset,
        formState:{errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    
    const onSubmit = (data) => {
        const newClient = {
           name: data.name, email: data.email, nif: data.nif, phone: data.phone, address: data.address
        }
        props.setClients(newClient)
        handleclose()
    }
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
            <div className="modal-content">
            <div className="modal-header">
                <h3 className='modal-title mx-auto' > <PersonAdd className="header-icon-popup"  /> Register Client</h3>
                <X className=' btn-close' fontSize={"x-large"} cursor="pointer" color='black' onClick={() => handleclose()} />
                </div>
                <hr/>
                <form className="form-popup" onSubmit={handleSubmit(onSubmit)}> <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="name">Name: </label>
                        <div className="col-sm-9">
                            <input type="text" name="name" className="form-control form-control-sm" placeholder="Full Name" {...register("name")} required />
                           <small className='error'>{errors.name?.message}</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="email">Email: </label>
                        <div className="col-sm-9">
                            <input type="email" name="email" className="form-control form-control-sm"   placeholder="Email" {...register("email")} required />
                            <small className='error'>{errors.email?.message}</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="phone">Telephone: </label>
                        <div className="col-sm-9">
                            <input type="tel" name="phone" className="form-control form-control-sm"  placeholder="91XXXXXXX" {...register("phone")} required />
                            <small className='error'>{errors.phone?.message}</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="nif">Nif: </label>
                        <div className="col-sm-9">
                            <input type="text" name="nif" className="form-control form-control-sm"  placeholder="NIF" {...register("nif")} required />
                            <small className='error'>{errors.nif?.message}</small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="address">Address: </label>
                        <div className="col-sm-9">
                            <textarea className="form-control  form-control-sm form_textArea" type="text" placeholder="Address" {...register("address")} required />
                            <small className='error'>{errors.address?.message}</small>
                        </div>
                    </div>
                    </div>
                    <div className="footer">
                        <Button type='submit' variant="outline-success" > Add Client <PersonAdd color='green' className='btn-icon' /></Button>
                    </div>
                </form>
                {props.children}
                
                </div>
            </div>
        </div>
    ) : ""
}
export default PopupAdd;
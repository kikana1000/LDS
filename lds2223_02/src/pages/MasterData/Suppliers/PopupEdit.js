import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X, BoxSeam, GearFill } from 'react-bootstrap-icons';
import '../../../components/Popup/Popup.css'
import { Button } from 'react-bootstrap';
import { validationMessage, validationPatterns } from "../../../pages/MasterData/validation.js"

function PopupEdit(props) {
    
    const schema = yup.object().shape({
        name: yup.string().required(validationMessage.required),
        phone: yup.string().matches(validationPatterns.phone, validationMessage.phone).required(validationMessage.required),
        description: yup.string().max(150, validationMessage.max150).required(validationMessage.required),
        email: yup.string().email(validationMessage.email).required(validationMessage.required),
        address: yup.string().max(120, validationMessage.max120).required()
    })
    const [firstTime, setFirstTime] = useState(true);
    const loadvalues = () => {
        if (props.supplier != null && firstTime === true) {
            setValue("description", props.supplier.description)
            setValue("phone", props.supplier.phone)
            setValue("name", props.supplier.name);
            setValue("email", props.supplier.email);
            setValue("address", props.supplier.address)
            setFirstTime(false)
        }
    }

    useEffect(() => loadvalues())

    const handleclose = () => {
        props.setTrigger(false)
        reset()
        setFirstTime(true)
        props.setSupplier(null)
    }

    const {
        handleSubmit, register, reset, setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const newSupplier = {
            ID: props.supplier.ID, name: data.name, email: data.email, phone: data.phone, description: data.description, address: data.address, isActive: true
        }

        props.setSuppliers(newSupplier);
        handleclose();
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className='modal-title mx-auto' > <BoxSeam className="header-icon-popup" fontSize={"x-large"} /> Edit Supplier</h3>
                        <X className='btn-close' fontSize={"x-large"} cursor="pointer" color='black' onClick={() => handleclose()} />
                    </div>
                    <hr />
                    <form className="form-popup" onSubmit={handleSubmit(onSubmit)}> <div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="name"><bold>Name:</bold> </label>
                            <div className="col-sm-9">
                                <input type="text" name="" id="name" className="form-control form-control-sm" placeholder="Name" {...register("name")} required />
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
                                <input type="tel" id="phone" className="form-control form-control-sm" placeholder="Phone Number" {...register("phone")} required />
                                <small className='error'>{errors.phone?.message}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="phone">Address: </label>
                            <div className="col-sm-9">
                                <textarea type="text" id="address" className="form-control form-control-sm form_textArea" placeholder="Address" {...register("address")} required />
                                <small className='error'>{errors.address?.message}</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="description">Description: </label>
                            <div className="col-sm-9">
                                <textarea type="text" id="description" className="form-control form-control-sm form_textArea" placeholder="Description about the supplier" {...register("description")} required />
                                <small className='error'>{errors.description?.message}</small>
                            </div>
                        </div>
                    </div>
                        <div className="footer">
                            <Button type='submit' variant="dark" onClick={handleSubmit(onSubmit)}> Edit Supplier <GearFill className='btn-icon' /></Button>
                        </div>
                    </form>
                    {props.children}
                </div>
            </div>
        </div>
    ) : ""
}
export default PopupEdit;
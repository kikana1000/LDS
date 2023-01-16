import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X,Plus, BoxFill } from 'react-bootstrap-icons';
import '../../../components/Popup/Popup.css'
import { Button} from 'react-bootstrap';
import { validationMessage,validationPatterns } from '../validation';

function PopupAdd(props){

    const schema = yup.object().shape({
        name: yup.string().required(validationMessage.required),
        phone: yup.string().matches(validationPatterns.phone,validationMessage.phone).required(validationMessage.required),
        description: yup.string().max(150, validationMessage.max150).required(validationMessage.required),
        email: yup.string().email(validationMessage.email).required(validationMessage.required),
        address:yup.string().max(120,validationMessage.max120).required()
    })
    const handleclose=()=> {
        props.setTrigger(false)
        reset()
    }
    
    const {
        handleSubmit, register, reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
      });

    
    const onSubmit  = (data) => {
        const newSupplier={
             name: data.name, email: data.email,phone:data.phone, description: data.description,address:data.address ,isActive:true
        }
        props.setSuppliers(newSupplier);
        handleclose();
    }
 return(props.trigger) ?(
    <div className='popup'>
        <div className='popup-inner'>
            <div className="modal-content">
            <div className="modal-header">

        <h3 className='modal-title mx-auto' > <BoxFill className="header-icon-popup" fontSize={"x-large"}/> Register Supplier</h3>
        <X className='btn-close' fontSize={"x-large"} cursor="pointer" color='black' onClick={()=> handleclose()} />
        </div>
                <hr/>
        <form className="form-popup" onSubmit={handleSubmit(onSubmit)}> <div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="name">Name: </label>
                    <div className="col-sm-9">
                    <input  type="text" name="" id="name"   className="form-control form-control-sm" {...register("name")} placeholder="Name" required/>
                    <small className='error'>{errors.name?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="email">Email: </label>
                    <div className="col-sm-9">
                    <input  type="email" id="email" className="form-control form-control-sm"  {...register("email")} placeholder="Email" required />
                    <small className='error'>{errors.email?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="phoneNumber">Telephone: </label>
                    <div className="col-sm-9">
                    <input  type="tel" id="phoneNumber" className="form-control form-control-sm"  {...register("phone")} placeholder="91XXXXXXX" required/>
                    <small className='error'>{errors.phoneNumber?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="address">Address: </label>
                    <div className="col-sm-9">
                    <textarea type="text" id="address" className="form-control form-control-sm form_textArea"  {...register("address")} placeholder="Address" required/>
                    <small className='error'>{errors.address?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="description">Description: </label>
                    <div className="col-sm-9">
                    <textarea  type="text" id="description"  className="form-control form-control-sm form_textArea"  {...register("description")} placeholder="Description about the supplier" required/>
                    <small className='error'>{errors.description?.message}</small>
                    </div>
                </div>
                </div>
            <div className="footer">
            <Button type='submit' variant="outline-success" > Add Supplier <Plus color='green' className='btn-icon'/></Button>
            </div>
        </form>
        {props.children}
        </div>
    </div>
    </div>
 ):""
}
export default PopupAdd;
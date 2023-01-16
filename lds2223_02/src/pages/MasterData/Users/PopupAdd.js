import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X,PersonAdd,PersonFillAdd } from 'react-bootstrap-icons';
import '../../../components/Popup/Popup.css'
import { Button} from 'react-bootstrap';
import { validationMessage,validationPatterns } from '../validation';

function PopupAdd(props){
    const schema = yup.object().shape({
    name: yup.string().required(validationMessage.required),
    phoneNumber: yup.string().matches(validationPatterns.phoneNumber,validationMessage.phoneNumber).required(validationMessage.required),
    role: yup.string().required(validationMessage.required),
    email: yup.string().email(validationMessage.email).required(validationMessage.required),
    nif:yup.string().matches(validationPatterns.number,validationMessage.number).min(9,validationMessage.nif).max(9,validationMessage.nif).required(),
    password:yup.string().min(8,validationMessage.password).max(20,validationMessage.password).matches(validationPatterns.password,validationMessage.password).required(validationMessage.required)
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
        const newUser={
            ID: (props.users[props.users.length-1].ID+1), Name: data.name,Email: data.email,  Role: data.role ,Password:data.password,Telephone:data.phoneNumber,NIF:data.nif,Active:true
        }
        const newUsers=[...props.users,newUser]
        props.setUsers(newUsers)
        handleclose()
    }

 return(props.trigger) ?(
    <div className='popup'>
        <div className='popup-inner'>
            
        <div className="modal-content">
            <div className="modal-header">
        <h3 className='modal-title mx-auto' > <PersonFillAdd className="header-icon-popup" fontSize={"x-large"}/> Register Employee</h3>
        <X className='btn-close' fontSize={"x-large"} cursor="pointer" color='black' onClick={()=> handleclose()} />
        </div>
                <hr/>
        <form className='form-body' onSubmit={handleSubmit(onSubmit)}>
                <div className=" form-outline form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="name">Name: </label>
                    <div className="col-sm-9">
                    <input  type="text"  id="name"  className="form-control form-control-sm " {...register("name")}  placeholder="Full Name" required/>
                    <small className='error'>{errors.name?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="email">Email: </label>
                    <div className="col-sm-9">
                    <input  type="email" id="email" className="form-control form-control-sm" {...register("email")}  placeholder="Email" required />
                    <small className='error'>{errors.email?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="phone">Telephone: </label>
                    <div className="col-sm-9">
                    <input  type="tel" id="phone" className="form-control form-control-sm" {...register("phoneNumber")} placeholder="Phone Number" required/>
                    <small className='error'>{errors.phoneNumber?.message}</small>
                    </div>
                </div> 
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="phone">Nif: </label>
                    <div className="col-sm-9">
                    <input  type="text" id="nif" className="form-control form-control-sm" {...register("nif")}  placeholder="Nif" required/>
                    <small className='error'>{errors.nif?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="role">Role: </label>
                    <div className="col-sm-9">
                    <select className="form-control form-control-sm" type="role"  id="role" {...register("role")} placeholder="Role" required>
                        <option value={"User"} defaultValue> User </option>
                        <option value={"Gestor"}> Gestor </option>
                        <option value={"Admin"}> Admin </option>
                    </select>
                    <small className='error'>{errors.role?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="password">Password: </label>
                    <div className="col-sm-9">
                    <input  className="form-control form-control-sm sm-mx-3" type="password"  id="password" {...register("password")}  placeholder="Password" required/>
                    <small className='error'>{errors.password?.message}</small>
                    </div>
            </div>
            <Button type='submit' variant="outline-success"  className="form-btn"> Add User <PersonAdd color='green' width={"40"} height={"40"}/></Button>
        </form>
        {props.children}
        </div>
    </div>
    </div>
 ):""
}
export default PopupAdd;
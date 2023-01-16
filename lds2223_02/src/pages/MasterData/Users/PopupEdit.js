import React,{ useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { X,PersonGear } from 'react-bootstrap-icons';
import '../../../components/Popup/Popup.css'
import { Button} from 'react-bootstrap';
import { validationMessage,validationPatterns } from '../validation';

function PopupEdit(props){
    const schema = yup.object().shape({
        name: yup.string().required(validationMessage.required),
        phoneNumber: yup.string().matches(validationPatterns.phoneNumber,validationMessage.phoneNumber).required(validationMessage.required),
        role: yup.string().required(validationMessage.required),
        email: yup.string().email(validationMessage.email).required(validationMessage.required),
        nif:yup.string().matches(validationPatterns.number,validationMessage.number).min(9,validationMessage.nif).max(9,validationMessage.nif).required(),
        password:yup.string().min(8,validationMessage.password).max(20,validationMessage.password).matches(validationPatterns.password,validationMessage.password).required(validationMessage.required)
    })
    const [firstTime,setFirstTime] = useState(true);
    const loadvalues =()=> {
        if(props.user!=null&&firstTime===true){
            setValue("role",props.user.Role)
            setValue("phoneNumber",props.user.Telephone)
            setValue("name",props.user.Name);
            setValue("email",props.user.Email);
            setValue("password",props.user.Password);
            setValue("nif",props.user.NIF)
            setFirstTime(false)
        }
    }

    useEffect(()=>loadvalues())

    const handleclose=()=> {
        props.setTrigger(false)
        reset()
        setFirstTime(true)
        props.setUser(null)
    }
    
    const {
        handleSubmit, register, reset,setValue,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
      });

    const updateUser = (data) => {
        props.setUsers(current =>
          current.map(users => {
            if (users.ID === props.user.ID ) {
              return {...users,ID: props.user.ID, Name: data.name, Email: data.email ,Role: data.role,Password:data.password,Telephone:data.phoneNumber,NIF:data.nif,Active:true };
            }
            return users;
          }),
        );
      };

    const onSubmit  = (data) => {
        updateUser(data)
        handleclose();
    }

 return(props.trigger) ?(
    <div className='popup'>
        <div className='popup-inner'>
        <div className="modal-content">
            <div className="modal-header">
        <h3 className='modal-title mx-auto' > <PersonGear className="header-icon-popup" fontSize={"x-large"}/> Edit Employees</h3>
        <X className='btn-close' fontSize={"x-large"} cursor="pointer" color='black' onClick={()=> handleclose()} />
        </div>
                <hr/>
        <form className='form-body' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="name">Name: </label>
                    <div className="col-sm-9">
                    <input  type="text" name="" id="name"  {...register("name")} className="form-control form-control-sm "  placeholder="Full Name" required/>
                    <small className='error'>{errors.name?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="email">Email: </label>
                    <div className="col-sm-9">
                    <input  type="email" id="email" {...register("email")} className="form-control form-control-sm"   placeholder="Email" required />
                    <small className='error'>{errors.email?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="phone">Phone: </label>
                    <div className="col-sm-9">
                    <input  type="tel" id="phone" {...register("phoneNumber")} className="form-control form-control-sm"   placeholder="Phone Number" required/>
                    <small className='error'>{errors.phoneNumber?.message}</small>
                    </div>
                </div> 
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="phone">Nif: </label>
                    <div className="col-sm-9">
                    <input  type="text" id="nif" {...register("nif")} className="form-control form-control-sm"   placeholder="Nif" required/>
                    <small className='error'>{errors.nif?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="role">Role: </label>
                    <div className="col-sm-9">
                    <select className="form-control form-control-sm" {...register("role")} type="role"  id="role"   placeholder="Role" required>
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
                    <input className="form-control form-control-sm sm-mx-3" {...register("password")} type="password"  id="password"  placeholder="Password" required/>
                    <small className='error'>{errors.password?.message}</small>
                    </div>
            </div>
            <div className="footer">
            <Button type='submit' variant="dark" > Edit User <PersonGear  className='btn-icon'/></Button>
            </div>
        </form>
        {props.children}
        </div>
        </div>
    </div>
 ):""
}
export default PopupEdit;
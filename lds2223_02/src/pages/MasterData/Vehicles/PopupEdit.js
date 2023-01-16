import React,{ useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { X,GearFill } from 'react-bootstrap-icons';
import '../../../components/Popup/Popup.css'
import { Button} from 'react-bootstrap';
import { validationMessage,validationPatterns } from '../validation';

function PopupEdit(props){
    const schema = yup.object().shape({
        licensePlate: yup.string().matches(validationPatterns.licensePlate,validationMessage.licensePlate).required(validationMessage.required),
        description: yup.string().max(150,validationMessage.max150).required(validationMessage.required),
        })
    const [firstTime,setFirstTime] = useState(true);
    const loadvalues =()=> {
        if(props.vehicle!=null&&firstTime===true){
            setValue("description",props.vehicle.description)
            setValue("licensePlate",props.vehicle.licensePlate);
            setFirstTime(false)
        }
    }

    useEffect(()=>loadvalues())

    const handleclose=()=> {
        props.setTrigger(false)
        reset()
        setFirstTime(true)
        props.setVehicle(null)
    }
    
    const {
        handleSubmit, register, reset,setValue,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(schema)
      });


    const onSubmit  = (data) => {
        
      const newVehicle = {
        ID: props.vehicle.ID, licensePlate: data.licensePlate,description: data.description, isActive: true
    }
    
    props.setVehicles(newVehicle);
    handleclose();
    }

 return(props.trigger) ?(
    <div className='popup'>
        <div className='popup-inner'>
        <div className="modal-content">
            <div className="modal-header">
        <h3 className='modal-title mx-auto' > <FontAwesomeIcon icon={faTruck} className="header-icon-popup" fontSize={"x-large"}/> Edit Vehicle</h3>
        <X className='btn-close' fontSize={"x-large"} cursor="pointer" color='black' onClick={()=> handleclose()} />
        </div>
        <hr/>
        <form className="form-body"onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="licensePlate">License Plate: </label>
                    <div className="col-sm-9">
                    <input  type="text"  id="licensePlate" className="form-control form-control-sm" {...register("licensePlate")}   placeholder="Vehicle's LicensePlate" required/>
                    <small className='error'>{errors.licensePlate?.message}</small>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label" htmlFor="description">Description: </label>
                    <div className="col-sm-9">
                    <textarea  type="text" id="description"  className="form-control  form-control-sm form_textArea" {...register("description")}    placeholder="Description about the Vehicle" required/>
                    <small className='error'>{errors.description?.message}</small>
                    </div>
                </div>
            <div className="footer">
            <Button type='submit' variant="dark" onClick={handleSubmit(onSubmit)}> Edit vehicle <GearFill  width={"40"} height={"40"}/></Button>
            </div>
        </form>
        {props.children}
        </div>
    </div>
    </div>
 ):""
}
export default PopupEdit;
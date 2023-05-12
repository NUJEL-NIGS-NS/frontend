import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import axios from 'axios';
import {Baseurl} from '../contants/Baseurl';

const UserRegister = () => {
    const {data,updateToken} = useContext(AppContext)

    const [form, setform] = useState({})
    const [FieldError, setFieldError] = useState({})
    
    const handleChange = (e)=>{
        setform({...form,[e.target.name] :e.target.value});
       
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        // console.log(form)
        try{
            const response = await axios.post(`${Baseurl}/a/register`,form);
         
            setFieldError({...response.data});
            console.log(FieldError)

        }
        catch(error){
            if (error.response) {
            console.log(error.response.data)
            }
        }
    } 
    useEffect(() => {
        if (FieldError.status) {
          alert(FieldError.status);
          updateToken(FieldError.token);
        }
      }, [FieldError, updateToken]);
         
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name='email'  onChange={handleChange} />
            {FieldError.email?<small>*{FieldError.email[0]}</small>:null}
            <br />
            <label>Full Name</label>
            <input type="text" name='name'  onChange={handleChange} />
            {FieldError.name?<small>*{FieldError.name[0]}</small>:null}
            <br />
            <label>User Name</label>
            <input type="text" name='username'  onChange={handleChange} />
            {FieldError.username?<small>*{FieldError.username[0]}</small>:null}
            <br />
            <label>Password</label>
            <input type="password" name='password'  onChange={handleChange} />
            {FieldError.password?<small>*{FieldError.password[0]}</small>:null}
            <br />
            <label>Confirm Password</label>
            <input type="password" name='password2'  onChange={handleChange} />
            {FieldError.password2?<small>*{FieldError.password2[0]}</small>:null}
            <br />
            <button type="submit">submit</button>
          
        </form>
      
    </div>
  )
}

export default UserRegister

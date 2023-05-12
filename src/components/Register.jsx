import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import axios from 'axios';
import {Baseurl} from '../contants/Baseurl';
import {useNavigate} from 'react-router-dom'
import { Button } from "react-bootstrap";

const Register = () => {
  const { data, updateToken } = useContext(AppContext);
  const [error, seterror] = useState('')
  const navigate =useNavigate()


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${Baseurl}/a/login`, {
        username: event.target.username.value,
        password: event.target.password.value,
      });
      
      if (response.data.token) {
        updateToken(response.data.token);
        navigate('/')

      }
    } catch (error) {
    
      if (error.response && error.response.data.non_field_errors ) {
        console.error(error.response.data.non_field_errors[0]);
        seterror(error.response.data.non_field_errors[0])
        
      }
   
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" id="username" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <h1>{error}</h1>
     
     <Button onClick={()=>updateToken(1)}> Register a New User</Button>

    </div>
  );
};

export default Register;

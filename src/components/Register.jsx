import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import axios from 'axios';
import {Baseurl} from '../contants/Baseurl';
import {useNavigate} from 'react-router-dom'
import { Button } from "react-bootstrap";
import "../components/Register.css"
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
 <div className="login-box">
  <img  className="image" src="/images/icon1.png" alt="jjj" />
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input type="text" name="username" id="username"  />
      <label>Username</label>
    </div>
    <div className="user-box">
      <input type="password" name="password" id="password" />
      <label>Password</label>
    </div>
    <center>
    <small>{error}</small>
      <Button type="submit">
        Login
        <span></span>
      </Button>
      
    </center>

  </form>
  <br></br>
  <div className="register-button-container text-center">
     <Button onClick={()=>updateToken(1)}> Register a New User</Button>
     </div>
</div>

      
 
    </div>
  );
};

export default Register;

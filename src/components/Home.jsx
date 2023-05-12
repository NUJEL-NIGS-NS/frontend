import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../AppContext";
import axios from 'axios';
import { Baseurl } from '../contants/Baseurl';
import NavBarh from './HomeComponents/NavBarh';
import State from './HomeComponents/State';
import {Routes,Route } from 'react-router-dom'
import AP from './Analytics/AP';


const Home = () => {
    const {data,updateToken}= useContext(AppContext)
    const [Details, setDetails] = useState({})

    axios.defaults.headers.common['Authorization'] =`Token ${data}`
    const handleLogout = async ()=>{
        try{
            const reponse = await axios.get(`${Baseurl}/a/logout`)
            
            if (reponse.data.status) {
                updateToken(0)
                axios.defaults.headers.common['Authorization'] = null;
            }
        }
        catch(error){
            console.log(error)
        }

    }
    useEffect(() => {
        const details = async ()=>{
            const response = await axios.get(`${Baseurl}/a/detail`) ;
            setDetails({...response.data});
        }
        details()

    }, [])
    


  return (
    <div>
        <NavBarh  data={Details} onClick={handleLogout} />
        <Routes>
        <Route path='/' element={<State/>}/>
        <Route path='/AP' element={<AP/>}/>
   
        </Routes>
        
       
     
    </div>
  )
}

export default Home

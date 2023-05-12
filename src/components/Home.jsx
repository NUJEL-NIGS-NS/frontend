import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../AppContext";
import axios from 'axios';
import { Baseurl } from '../contants/Baseurl';


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
        {Details!={}?<h1>{Details.name}   ({Details.designation})</h1>:null}
      <button onClick={handleLogout}>logout</button>
     
    </div>
  )
}

export default Home

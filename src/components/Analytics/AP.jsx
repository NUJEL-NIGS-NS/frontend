import React, { useContext, useEffect, useState } from "react";
import MonthlyChart from "../AnalyticalComponents/MonthlyChart";
import axios from "axios";
import { Baseurl } from "../../contants/Baseurl";
import { AppContext } from "../../AppContext";
import Loading1 from "../LoadingComponents/Loading1";
import PienChart from "../AnalyticalComponents/PienChart";
import {Container,Row,Col} from 'react-bootstrap'
import ListChart from "../AnalyticalComponents/ListChart";

import Manager from "../AnalyticalComponents/Manager";

const AP = () => {
  const [MonData, setMonData] = useState([]);
  const [Pie, setPie] = useState([]);
  const [ManData, setManData] = useState([])
  const { data } = useContext(AppContext);
  const [Load, setLoad] = useState(false);
  axios.defaults.headers.common["Authorization"] = `Token ${data}`;

  const monthlydata = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/monthly`);
      console.log(response.data);
      setMonData(response.data);
      setLoad(true);
    } catch (error) {
      console.log(error);
    }
  };
  const pieData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/pie`);
      if (response.data.status !== "error") {
        setPie(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getManData = async ()=>{
    try{
      const response = await axios.get(`${Baseurl}/AP/manager`) ;
      if (response.data.status!=="error") {
        setManData(response.data.status)
        
      }
    }
    catch(error){

    }
  };

  useEffect(() => {
    monthlydata();
    pieData();
    getManData();
  },[] );

  return (
    <div>
      {Load ? <MonthlyChart data={MonData} /> : <Loading1 />}
      <Container>
      <Row>
      <hr/>
        <Col md={6}>{Pie !== [] ? <PienChart data={Pie}></PienChart> : <Loading1 />}</Col>
        <Col md={6}>{Pie !== [] ? <ListChart data={Pie}/> : <Loading1 />}</Col>
      </Row>
      <Row>
      <Col md={6}>{ManData !== []?<Manager data={ManData}/>:<Loading1/>}</Col>
      <Col md={6}>{ManData !== []?<Manager data={ManData}/>:<Loading1/>}</Col>

      </Row>
      
      </Container>
      

    </div>
  );
};

export default AP;

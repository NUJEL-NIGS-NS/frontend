import React, { useContext, useEffect, useState } from "react";
import MonthlyChart from "../AnalyticalComponents/MonthlyChart";
import axios from "axios";
import { Baseurl } from "../../contants/Baseurl";
import { AppContext } from "../../AppContext";
import Loading1 from "../LoadingComponents/Loading1";
import PienChart from "../AnalyticalComponents/PienChart";
import { Container, Row, Col } from "react-bootstrap";
import ListChart from "../AnalyticalComponents/ListChart";

import Manager from "../AnalyticalComponents/Manager";
import MapCom from "../AnalyticalComponents/MapCom";
import YerMonBar from "../AnalyticalComponents/YerMonBar";
import ProductAnz from "../AnalyticalComponents/ProductAnz";

const AP = () => {
  const [MonData, setMonData] = useState([]);
  const [Pie, setPie] = useState([]);
  const [ManData, setManData] = useState([]);
  const [proData, setproData] = useState([])
  const { data } = useContext(AppContext);
  const [Load, setLoad] = useState(false);
  const [mapData, setmapData] = useState([])
  axios.defaults.headers.common["Authorization"] = `Token ${data}`;

  const monthlydata = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/monthly`);
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
  const getManData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/manager`);
      if (response.data.status !== "error") {
        setManData(response.data.status);
      }
    } catch (error) {}
  };
  const getProduct = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/pro`);
      if (response.data) {
        setproData(response.data);
      }
    } catch (error) {}
  };
  const getMapData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/check`);
      setmapData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    monthlydata();
    pieData();
    getManData();
    getProduct();
    getMapData();
  }, []);

  return (
    <div>
      {Load ? <MonthlyChart data={MonData} /> : <Loading1 />}
      <Container>
        <Row>
          <hr />
          <Col md={6}>
            {Pie !== [] ? <PienChart data={Pie}></PienChart> : <Loading1 />}
          </Col>
          <Col md={6}>
            {Pie !== [] ? <ListChart data={Pie} /> : <Loading1 />}
          </Col>
        </Row>
          <br />
          <hr />
        <Row>
          <Col md={6}>
            {ManData !== [] ? <Manager data={ManData} /> : <Loading1 />}
          </Col>
          <Col md={6}>{mapData !== [] ? <MapCom data={mapData} /> : <Loading1 />}</Col>
        <hr />
        </Row>

          <br />
         <YerMonBar/>
         <br />
         <hr></hr>
         <Row>

          <Col md={6}><ProductAnz data={proData}/></Col>
          <Col md={6}></Col>

         </Row>
      </Container>
    </div>
  );
};

export default AP;

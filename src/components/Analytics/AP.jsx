import React, { useContext, useEffect, useState } from "react";
import MonthlyChart from "../AnalyticalComponents/MonthlyChart";
import axios from "axios";
import { Baseurl } from "../../contants/Baseurl";
import { AppContext, StateContext } from "../../AppContext";
import Loading1 from "../LoadingComponents/Loading1";
import PienChart from "../AnalyticalComponents/PienChart";
import { Container, Row, Col } from "react-bootstrap";
import ListChart from "../AnalyticalComponents/ListChart";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Manager from "../AnalyticalComponents/Manager";
import MapCom from "../AnalyticalComponents/MapCom";
import YerMonBar from "../AnalyticalComponents/YerMonBar";
import ProductAnz from "../AnalyticalComponents/ProductAnz";
import BEMonAnl from "../AnalyticalComponents/BEMonAnl";
import Uploadcsv from "../AnalyticalComponents/Uploadcsv";
import AgencyaAnalysis from "../AnalyticalComponents/AgencyaAnalysis";

const AP = () => {
  const [MonData, setMonData] = useState([]);
  const [Pie, setPie] = useState([]);
  const [ManData, setManData] = useState([]);
  const [proData, setproData] = useState([]);
  const { data } = useContext(AppContext);
  const { StatePath, stateName } = useContext(StateContext);
  const [mapData, setmapData] = useState([]);
  const [BeMonData, setBeMonData] = useState(false);
  const [finacialYear, setFinacialYear] = useState([]);
  const [fetchFnYear, setfetchFnYear] = useState(false);
  const [agencyData, setAgencyData] = useState(false);
  axios.defaults.headers.common["Authorization"] = `Token ${data}`;

  const monthlydata = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/monthly`);
      setMonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const pieData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/pie`);
      if (response.data.status !== "error") {
        setPie(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getManData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/manager`);
      if (response.data.status !== "error") {
        setManData(response.data.status);
      }
    } catch (error) {}
  };
  const getProduct = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/pro`);
      if (response.data) {
        setproData(response.data);
      }
    } catch (error) {}
  };
  const getMapData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/geo`);
      setmapData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBeMonData = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/be`);
      setBeMonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFinancialYear = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/financialyear`);
      setFinacialYear(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAgency = async () => {
    try {
      const response = await axios.get(`${Baseurl}/${StatePath}/agency`);
      setAgencyData(response.data);
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
    getBeMonData();
    getFinancialYear();
    getAgency();
  }, []);

  const handleFinYearClick = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}/${StatePath}/pie?year=${fetchFnYear}`
      );
      if (response.data.status !== "error") {
        setPie(response.data.status);
        console.log(response.data.status);
        console.log(fetchFnYear);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFinYearClick();
  }, [fetchFnYear]);

  return (
    <div>
      {MonData.length === 0 ? (
        <Loading1 />
      ) : (
        <MonthlyChart data={MonData} name={stateName} />
      )}

      <Container>
        <Row>
          <hr
            style={{
              height: 2,
              borderWidth: 0,
              color: "gray",
              backgroundColor: "gray",
            }}
          />
          <DropdownButton id="dropdown-basic-button" title="Financial Year">
            {finacialYear?.map((item, index) => (
              <Dropdown.Item key={index} onClick={() => setfetchFnYear(item)}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <Col md={6}>
            {Pie.length === 0 ? <Loading1 /> : <PienChart data={Pie} />}
          </Col>
          <Col md={6}>
            {Pie.length === 0 ? <Loading1 /> : <ListChart data={Pie} />}
          </Col>
        </Row>
        <br />
        <hr
          style={{
            height: 2,
            borderWidth: 0,
            color: "gray",
            backgroundColor: "gray",
          }}
        />

        <Row>
          <Col md={6}>
            {ManData !== [] ? <Manager data={ManData} /> : <Loading1 />}
          </Col>
          <Col md={6}>
            {mapData !== [] ? <MapCom data={mapData} /> : <Loading1 />}
          </Col>
          <hr
            style={{
              height: 2,
              borderWidth: 0,
              color: "gray",
              backgroundColor: "gray",
            }}
          />
        </Row>
        <Row>
          <br />
          <Col>
            <YerMonBar path={StatePath} />
          </Col>
          <br />
          <hr
            style={{
              height: 2,
              borderWidth: 0,
              color: "gray",
              backgroundColor: "gray",
            }}
          />
        </Row>

        <Row>
          <Col md={12} style={{ marginBottom: "20px" }}>
            <ProductAnz data={proData} path={StatePath} />
          </Col>
        </Row>
        <hr
          style={{
            height: 2,
            borderWidth: 0,
            color: "gray",
            backgroundColor: "gray",
          }}
        />

        <Row>
          <Col md={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
            {!BeMonData ? <Loading1 /> : <BEMonAnl data={BeMonData} />}
          </Col>
        </Row>
        <hr
          style={{
            height: 2,
            borderWidth: 0,
            color: "gray",
            backgroundColor: "gray",
          }}
        />
        <Row>
          {!agencyData ? (
            <Loading1 />
          ) : (
            <AgencyaAnalysis data={agencyData} path={StatePath} />
          )}
        </Row>
        <hr
          style={{
            height: 2,
            borderWidth: 0,
            color: "gray",
            backgroundColor: "gray",
          }}
        />
        <Row>
          <Col md={12}>
            <Uploadcsv finYear={finacialYear} path={StatePath} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AP;

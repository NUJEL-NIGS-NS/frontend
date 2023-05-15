import React, { useState } from "react";
import {
  DropdownButton,
  Dropdown,
  Button,
  Row,
  Container,
  Col,
} from "react-bootstrap";
import "../AnalyticalComponents/Manager.css";
import Loading1 from "../LoadingComponents/Loading1";
import axios from "axios";
import { Baseurl } from "../../contants/Baseurl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MyDropdown() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [BarData, setBarData] = useState(false);
  const [month, setmonth] = useState("");
  const [year, setyear] = useState(0);
  const getBarData = async () => {
    try {
      const response = await axios(
        `${Baseurl}/AP/Bar?month=${month}&year=${year}`
      );
      if (response.data) {
        setBarData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    getBarData();
  };
  return (
    <Container>
      <Row>
        <Col md={6}>
          <div className="Year-Month">
            <DropdownButton id="dropdown-basic-button" title="Month">
              {months.map((item, index) => (
                <Dropdown.Item key={index} onClick={() => setmonth(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <div>
              <input
                type="number"
                className="year-input"
                onChange={(e) => setyear(e.target.value)}
              ></input>
              <br></br>
              <Button onClick={handleClick}>Search</Button>
            </div>
          </div>
        </Col>
        <Col md={6}>
          {" "}
          {!BarData ? (
            <Loading1 />
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={BarData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Business_executive" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#0ad6ff" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyDropdown;

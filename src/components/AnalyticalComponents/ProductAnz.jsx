import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Baseurl } from "../../contants/Baseurl";

const ProductAnz = ({ data }) => {
  const [proDat, setproDat] = useState([]);
  const [click, setclick] = useState(false);
  const [top, settop] = useState(5);
  const [newData, setnewData] = useState([]);
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [erMsg, seterMsg] = useState("");

  useEffect(() => {
    setnewData(data);
    setproDat(data);
  }, [data]);

  const hanldlecheck = async () => {
    if (month !== "" && year !== "") {
      seterMsg("");
      try {
        const response = await axios.get(
          `${Baseurl}/AP/pro?month=${month}&year=${year}`
        );
        if (response.data) {
          setnewData(response.data);
          setproDat(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      seterMsg("Select Month and Enter year");
    }
  };

  const handleClick = () => {
    const sortedData = newData;
    if (!click) {
      sortedData.sort((a, b) => b.sales - a.sales);
    } else {
      sortedData.sort((a, b) => b.TotalQty - a.TotalQty);
    }
    setproDat(sortedData.slice(0, top));
    setclick(!click);
  };

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

  return (
    <div>
      <h1 className="font-italic text-center">
        Top Products Based On Sales/Quantity
      </h1>
      <br />
      <input
        type="number"
        value={top}
        onChange={(e) => settop(e.target.value)}
        placeholder="Top"
        style={{ marginRight: "10px" }}
      />

      <Button onClick={handleClick} style={{ marginRight: "10px" }}>
        {click ? "Sales" : "Quantity"}
      </Button>
      <Button
        onClick={() => {
          setnewData(data);
          setproDat(data);
        }}
      >
        Total
      </Button>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={proDat}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="Product" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="TotalQty" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="sales" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>

      <small>{erMsg ? erMsg : ""}</small>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" , width:"100%"}}>
        <DropdownButton
          id="dropdown-basic-button"
          title="Month"
          style={{ marginRight: "10px" }}
        >
          {months.map((item, index) => (
            <Dropdown.Item key={index} onClick={() => setmonth(item)}>
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <input
          type="number"
          value={year}
          onChange={(e) => setyear(e.target.value)}
          placeholder="Enter year"
          style={{ marginRight: "10px" }}
        />
        <Button onClick={hanldlecheck}>Check</Button>
      </div>
    </div>
  );
};
export default ProductAnz;

import React from "react";
import { Container, } from "react-bootstrap";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyChart = ({ data ,name}) => {

  return (
    <Container fluid>
        <hr></hr>
        <h1 className="font-italic text-center">{name} TOTAL SALES MONTHLY</h1>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data.status}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: "", angle: -90, position: "insideLeft" }}
          tick={{ fontSize: 12 }} domain={[0,1500000]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total_sales"
            stroke="#8884d8"
            fill="#0dcaf0"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default MonthlyChart;

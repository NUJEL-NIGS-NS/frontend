import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const COLORS = scaleOrdinal(schemeCategory10).range();

const BEMonAnl = ({ data }) => {
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Business Executive <br/> v/s Month
      </h1><br /><br />

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {data.Business_executive.map((item, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={item}
              stroke={COLORS[index % COLORS.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BEMonAnl;

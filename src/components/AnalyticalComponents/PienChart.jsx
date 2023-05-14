import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const COLORS = scaleOrdinal(schemeCategory10).range();

const PieChartComponent = ({ data }) => (
  <>
    <h1 className="font-italic text-center">Sales Contribution</h1>
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={data}
        dataKey="total_sales"
        nameKey="Business_executive"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={(entry) => entry.name}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
     
    </PieChart>
  </ResponsiveContainer>
  </>
);

export default PieChartComponent;

import React, { useState } from "react";
import Table from "react-bootstrap/Table";

const ListChart = ({ data }) => {
  // Calculate total sales
  const totalSales = data.reduce((accumulator, item) => {
    return accumulator + item.total_sales;
  }, 0);

  return (
    <>
      <br />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Business Executive</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.Business_executive}</td>
                <td>{item.total_sales}</td>
              </tr>
            );
          })}
          <tr>
            <td>#</td>
            <td>Total Sales:</td>
            <td>{totalSales}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ListChart;

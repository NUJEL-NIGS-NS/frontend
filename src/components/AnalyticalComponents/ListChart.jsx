import React from "react";
import Table from "react-bootstrap/Table";

const ListChart = ({ data }) => {
  return (
    <>
    <br/>
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
        </tbody>
      </Table>
    </>
  );
};

export default ListChart;

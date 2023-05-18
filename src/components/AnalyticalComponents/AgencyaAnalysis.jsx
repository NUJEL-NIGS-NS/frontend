import axios from 'axios';
import React, { useState } from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import { Baseurl } from '../../contants/Baseurl';
import Table from "react-bootstrap/Table";

const AgencyaAnalysis = ({ data }) => {
  const [month, setMonth] = useState('');
  const [businessExecutive, setBusinessExecutive] = useState(null);
  const [agency, setAgency] = useState("")
  const [billData, setBillData] = useState(false)
  
  const handleClick =async ()=>{
    try{
        const response = await axios.get(`${Baseurl}/AP/agency/filter?month=${month}&be=${businessExecutive}&agency=${agency}`)
        if (response.data) {
            setBillData(response.data)
        }
    }
    catch(error){
        console.log(error)
    }
  }
  return (
    <Container>
        <Row>
        <h1 className="font-italic text-center">Agency Invoice Details </h1>
        </Row>
     <Row>
     <Col md={4}>

    <div className="text-center uploadclass">
      <DropdownButton id="dropdown-month" title="Month">
        {Object.keys(data).map((item, index) => (
            <Dropdown.Item key={index} onClick={() => setMonth(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {month && (
          <DropdownButton id="dropdown-business-executive" title="Business Executive">
          {Object.keys(data[month])?.map((item, index) => (
              <Dropdown.Item key={index} onClick={() => setBusinessExecutive(item)}>
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}

      {businessExecutive && (
          <DropdownButton id="dropdown-agency" title="Agency">
          {data[month][businessExecutive]?.map((item, index) => (
              <Dropdown.Item key={index} onClick={() => setAgency(item)}>
                  {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
    {agency && (<>
  <h5>{agency}</h5>
 <Button on onClick={handleClick}>Get Sales Data</Button>
  </>
)}
    </div>
      </Col>
      <Col md={8}>
        {billData &&<>
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
            <th>#</th>   
            <th>Date</th>
            <th>Product</th>
            <th>Billed_qty</th>
             <th>Billed_rate</th>
          </tr>
            </thead>
            <tbody>
                {billData?.map((item,index)=>(
                    <tr key={index}> 
                    <td>{index+1}</td>
                    <td>{item.Date}</td>
                    <td>{item.Product}</td>
                    <td>{item.Billed_qty}</td>
                    <td>{item.Billed_rate}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>}
      </Col>
          </Row>
      </Container>
  );
};

export default AgencyaAnalysis;

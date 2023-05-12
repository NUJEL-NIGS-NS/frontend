import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


const State = () => {
    
    const navigate = useNavigate();
    function navigateToPage() {
      navigate('/AP');
    }
  return (
    <div>
          <Card className='bg-info text-center'>
      <Card.Header as="h5">Select State</Card.Header>
      <Card.Body>
        <Card.Title>ANDHRA PRADESH</Card.Title>
        <Card.Text>
        To view state-wise analysis of Andhra Pradesh state, click below
        </Card.Text>
        <Button variant="primary" onClick={navigateToPage}>View Analysis</Button>
      </Card.Body>
      <Card.Body>
        <Card.Title>................</Card.Title>
        <Card.Text>
          .......
        </Card.Text>
        <Button variant="primary">........</Button>
      </Card.Body>
      <Card.Body>
        <Card.Title>................</Card.Title>
        <Card.Text>
          .......
        </Card.Text>
        <Button variant="primary">........</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default State

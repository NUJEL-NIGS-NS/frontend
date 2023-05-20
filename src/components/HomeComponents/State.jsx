import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Baseurl } from "../../contants/Baseurl";
import { StateContext } from "../../AppContext";

const State = () => {
  const { updateState ,updateStateName} = useContext(StateContext);
  const [state, setState] = useState([]);

  useEffect(() => {
    const getStateData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/mas/state`);
        setState(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStateData();
  }, []);

  const navigate = useNavigate();
  function navigateToPage(path) {
    updateState(path.Path);
    updateStateName(path.State)
    
    navigate("/AP");
  }

  return (
    <div>
      <Card className="bg-info text-center">
        <Card.Header as="h5">Select State</Card.Header>
        {state?.map((item) => (
          <React.Fragment key={item.State}>
            <Card.Body>
              <Card.Title>{item.State}</Card.Title>
              <Card.Text>
                To view state-wise analysis {item.State} state, click below
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigateToPage(item)}
              >
                View Analysis
              </Button>
            </Card.Body>
            <hr />
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
};

export default State;

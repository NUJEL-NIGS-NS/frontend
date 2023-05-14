import React from "react";
import "../AnalyticalComponents/Manager.css";

const Manager = ({data}) => {

  return (
      <>  <h1 className="font-italic text-center">MANAGERS</h1>
    <div className="flip-card">
      {data.map((item) => {
        return (
            <div className="flip-card-inner">
            <div className="flip-card-front">
              <p className="title">Regional Manager</p>
              <p>{item.Regional_manager}</p>
            </div>
            <div className="flip-card-back">
        
            <br></br>
            {item.business_executives.map((obj)=>{
            return(<>
                <p>{obj}</p>
                </>
                )
            } )}
            </div>
              
          </div>
        );
      })}
    </div>
    </>
  );
};

export default Manager;

import axios from "axios";
import React, { useState } from "react";
import { Baseurl } from "../../contants/Baseurl";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";

const Upload_csv = ({ finYear ,path }) => {
  const [file, setFile] = useState(null);
  const [year, setYear] = useState(finYear[0]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Upload file");
      return;
    }

    if (file.type !== "text/csv") {
      alert("Only CSV files are supported");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file, file.name); // Set the file with the key "file"
      const response = await axios.post(`${Baseurl}/${path}/upload`, formData);
      alert(response.data.status);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handledelete = async () => {
    const result = window.confirm(
      `Are you sure you want to perform this action? \n This will delete all the data in your Data Base \n ${year} financial year data will be totally deleted`
    );
    if (result) {
      try {
        const response = await axios.get(
          `${Baseurl}/${path}/delete?fin-year=${year}`
        );
        alert(response.data.status);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="text-center uploadclass">
      <h3 className="font-italic text-center">Add Data to the DataBase</h3>
      <input type="file" name="" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload CSV</Button>
      <h3 className="font-italic text-center">
        Delete Data From to the DataBase
      </h3>

      <DropdownButton id="dropdown-basic-button" title="Financial Year">
        {finYear?.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => setYear(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button onClick={handledelete}>Delete DB</Button>
    </div>
  );
};

export default Upload_csv;

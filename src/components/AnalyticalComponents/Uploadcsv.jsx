import axios from "axios";
import React, { useState } from "react";
import { Baseurl } from "../../contants/Baseurl";
import { Button } from "react-bootstrap";

const Upload_csv = () => {
  const [file, setFile] = useState(null);

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
      const response = await axios.post(`${Baseurl}/AP/upload`, formData);
      alert(response.data.status);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handledelete = async () => {
    try {
      const response = await axios.get(`${Baseurl}/AP/delete`);
      alert(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input type="file" name="" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Upload CSV</Button>

        <Button onClick={handledelete}>Delete DB</Button>
      </div>
    </div>
  );
};

export default Upload_csv;

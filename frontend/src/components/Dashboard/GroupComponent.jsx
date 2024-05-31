import { Button } from "@mui/material";
import PropTypes from "prop-types";
import Add from "../UI/Add";
import Logo from "../UI/Logo";
import { useState } from 'react';
import axios from 'axios';
import Tick from "../UI/Tick"; 





const GroupComponent = ({ className = "" }) => {

  const [file, setFile] = useState(null);
  const [message,setMessage] = useState(false);
  const [contentFile, setcontentFile] = useState("");

  const handleFileChange = (event) => {
        setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

      });
      setMessage(true);
      setcontentFile(response.data.extracted_text);
      console.log(contentFile);
      // console.log(response.data.chunks);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage(false);
    }
  };

  return (
    <header
      className={`w-full shadow-md bg-white flex flex-row items-center justify-between py-4 pr-6 pl-6 box-border top-0 z-50 sticky gap-4 sm:py-6 sm:pr-12 sm:pl-12 ${className}`}
    >
      <Logo />
      <div className="flex items-center">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input type="file" onChange={handleFileChange}></input>
            <Button
              type="submit"
              onChange={handleFileChange}
              className="z-1"
              startIcon={<Add />}
              disableElevation
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#000",
                fontSize: { xs: "12px", sm: "14px" }, // Responsive font size
                borderColor: "#000",
                borderRadius: "8px",
                "&:hover": { borderColor: "#000" },
                height: { xs: 35, sm: 39 }, // Responsive height
              }}
            >
              Upload
              </Button>
        </form>
        {message? <Tick/> : false}
      </div>

    </header>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
};

export default GroupComponent;


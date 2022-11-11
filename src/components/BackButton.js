import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "./BackButton.css";

const BackButton = () => {
  return (
    <div className="back-button-container">
      <Link className="link" to="/">
        <button className="backbutton">{<ArrowBackIcon />} Back</button>
      </Link>
    </div>
  );
};

export default BackButton;

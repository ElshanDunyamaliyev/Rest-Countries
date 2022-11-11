import React, { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "./Header.css";

const Header = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const darkModeClickHandler = () => {
    setDarkMode(!darkMode);
    props.darkModeState(!darkMode);
  };

  return (
    <div className={!darkMode ? "dark-mode" : "light-mode"}>
      <div className="header">
        <div className="header_container">
          <h2>Where in the world?</h2>
          <div onClick={darkModeClickHandler} className="switch-mode">
            <DarkModeIcon />
            <h2>Dark Mode</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  const handleContributors = () => {
    navigate("/contributors");
  };

  const handleTryTranslate = () => {
    navigate("/trytranslate");
  };

  return (
    <div>
      <div className="nav">
        <div className="nav-left">
          <img src="assets/logo.png" alt="logo" height={70} />
        </div>
        <div className="nav-right">
          <button className="navbutton" onClick={handleHome}>
            Home
          </button>
          <button className="navbutton" onClick={handleTryTranslate}>
            Try Translation
          </button>
          <button className="navbutton" onClick={handleContributors}>
            Contributors
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

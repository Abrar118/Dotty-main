import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul className="tabs">
        <li>
          <Link to="/currentscore">Current Score</Link>
        </li>
        <li>
          <Link to="/scorelist">Score History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

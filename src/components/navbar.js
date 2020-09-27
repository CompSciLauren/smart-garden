import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        SmartGarden
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              View Moisture Readings
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/user" className="nav-link">
              Create User
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/plant" className="nav-link">
              Create Plant
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/moistureMeasurement" className="nav-link">
              Add Moisture Reading
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

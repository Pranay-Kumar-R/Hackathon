
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Roles from "./Roless"; 
import "./Dashboard.css"; 

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <header className="header">
            <div className="logo">Logo</div>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/freshers-roles">Freshers Roles</Link>
                </li>
                <li>
                  <Link to="/instructions">Instructions</Link>
                </li>
              </ul>
            </nav>
            <button type="button" className="btn btn-secondary " data-mdb-ripple-init>Logout</button>

          </header>
          <Routes>
            <Route  path="/" element={<div>Home Page</div>} />
            <Route path="/freshers-roles" element={<Roles />} />
            <Route path="/instructions" element={<div>Instructions Page</div>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default Dashboard;
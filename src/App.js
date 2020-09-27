import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
// import logo from "./logo.svg";
import "./App.css";

import MoistureMeasurementList from "./components/view-moisture-measurements";
import CreateUser from "./components/create-user";
import CreatePlant from "./components/create-plant";
import AddMoistureMeasurement from "./components/add-moisture-measurement";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={MoistureMeasurementList} />
        {/* <Route path="/edit/:id" exact component={EditMoistureMeasurement} /> */}
        <Route path="/user" exact component={CreateUser} />
        <Route path="/plant" exact component={CreatePlant} />
        <Route
          path="/moistureMeasurement"
          exact
          component={AddMoistureMeasurement}
        />
      </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

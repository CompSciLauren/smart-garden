import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MoistureMeasurements = (props) => {
  console.log("PROPS:", props);
  return (
    <tr>
      <td>{props.moistureMeasurement.plantName}</td>
      <td>{props.moistureMeasurement.moistureReading}</td>
      <td>{props.moistureMeasurement.date.substring(0, 16)}</td>
      <td>
        <Link to={"/edit/" + props.moistureMeasurement._id}>
          <button>edit</button>
        </Link>{" "}
        |{" "}
        <button
          onClick={() => {
            props.deleteMoistureMeasurement(props.moistureMeasurement._id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default class MoistureMeasurementList extends Component {
  constructor(props) {
    super(props);

    this.deleteMoistureMeasurement = this.deleteMoistureMeasurement.bind(this);

    this.state = { plantName: "basil", plants: [], moistureMeasurements: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/plants")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            plants: response.data.map((plant) => plant.plantName),
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/moistureMeasurements/${this.state.plantName}`)
      .then((response) => {
        this.setState({ moistureMeasurements: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangePlantName = (e) => {
    this.setState({ plantName: e.target.value });
    axios
      .get("http://localhost:5000/moistureMeasurements/" + e.target.value)
      .then((response) => {
        this.setState({ moistureMeasurements: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteMoistureMeasurement(id) {
    axios
      .delete("http://localhost:5000/moistureMeasurements/" + id)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      moistureMeasurements: this.state.moistureMeasurements.filter(
        (el) => el._id !== id
      ),
    });
  }

  moistureMeasurementsList() {
    return this.state.moistureMeasurements.map((currentMeasurement) => {
      return (
        <MoistureMeasurements
          moistureMeasurement={currentMeasurement}
          deleteMoistureMeasurement={this.deleteMoistureMeasurement}
          key={currentMeasurement._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Moisture Measurements</h3>
        <label>View data for specific plant: </label>
        <select
          ref="plantInput"
          required
          className="form-control"
          value={this.state.plantName}
          onChange={this.onChangePlantName}
        >
          {this.state.plants.map(function (plant) {
            return (
              <option key={plant} value={plant}>
                {plant}
              </option>
            );
          })}
        </select>
        <br />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Plant Name</th>
              <th>Moisture Reading</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.moistureMeasurementsList()}</tbody>
        </table>
      </div>
    );
  }
}

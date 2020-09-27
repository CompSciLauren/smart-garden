import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangePlantName = this.onChangePlantName.bind(this);
    this.onChangeMoistureMeasurement = this.onChangeMoistureMeasurement.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      plantName: "",
      moistureReading: "",
      plants: [],
    };
  }

  componentDidMount() {
    this.setState({
      plantName: "",
      moistureReading: "",
    });

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
  }

  onChangePlantName(e) {
    this.setState({ plantName: e.target.value });
  }

  onChangeMoistureMeasurement(e) {
    this.setState({ moistureReading: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const dataObject = {
      plantName: this.state.plantName,
      moistureReading: this.state.moistureReading,
    };

    axios
      .post("http://localhost:5000/moistureMeasurements/add", dataObject)
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ plantName: "" });
    this.setState({ moistureReading: "" });
  }

  render() {
    return (
      <div>
        <h3>Add New Moisture Reading</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Plant Name: </label>
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

            <label>Moisture Reading: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.moistureReading}
              onChange={this.onChangeMoistureMeasurement}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add Moisture Reading"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditMoistureMeasurement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantName: "",
      moistureReading: "",
      date: new Date(),
      plants: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/moistureMeasurements/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          plantName: response.data.plantName,
          moistureReading: response.data.moistureReading,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
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

  onChangePlantName = (e) => {
    this.setState({ plantName: e.target.value });
  };

  onChangeMoistureReading = (e) => {
    this.setState({ moistureReading: e.target.value });
  };

  onChangeDate = (date) => {
    this.setState({ date: date });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const dataObject = {
      plantName: this.state.plantName,
      moistureReading: this.state.moistureReading,
      date: this.state.date,
    };

    axios
      .post(
        "http://localhost:5000/moistureMeasurements/edit/" +
          this.props.match.params.id,
        dataObject
      )
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h3>Edit MoistureMeasurement Log</h3>
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
          </div>
          <div className="form-group">
            <label>Moisture Reading: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.moistureReading}
              onChange={this.onChangeMoistureReading}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Moisture Measurement Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

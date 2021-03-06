import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "Lauren",
      plantName: "Zebra Plant",
      moistureReading: "",
      users: [],
      plants: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/plants/${this.state.username}`)
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

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });

    axios
      .get(`http://localhost:5000/plants/${e.target.value}`)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            plants: response.data.map((plant) => plant.plantName),
          });

          this.setState({
            plantName: response.data[0].plantName,
          });
        }
      })
      .then(() => {
        axios
          .get(
            `http://localhost:5000/moistureMeasurements/${this.state.username}/${this.state.plantName}`
          )
          .then((response) => {
            this.setState({ moistureMeasurements: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onChangePlantName = (e) => {
    this.setState({ plantName: e.target.value });

    axios
      .get(
        `http://localhost:5000/moistureMeasurements/${this.state.username}/${e.target.value}`
      )
      .then((response) => {
        this.setState({ moistureMeasurements: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onChangeMoistureMeasurement = (e) => {
    this.setState({ moistureReading: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const dataObject = {
      username: this.state.username,
      plantName: this.state.plantName,
      moistureReading: this.state.moistureReading,
    };

    axios
      .post("http://localhost:5000/moistureMeasurements/add", dataObject)
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ moistureReading: "" });
  };

  render() {
    return (
      <div>
        <h3>Add New Moisture Reading</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>

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

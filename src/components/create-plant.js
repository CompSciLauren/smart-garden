import React, { Component } from "react";
import axios from "axios";

export default class CreatePlant extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePlantName = this.onChangePlantName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      plantName: "",
      users: [],
    };
  }

  componentDidMount() {
    this.setState({
      username: "Lauren",
      plantName: "",
    });

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
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePlantName(e) {
    this.setState({ plantName: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const dataObject = {
      username: this.state.username,
      plantName: this.state.plantName,
    };

    axios
      .post("http://localhost:5000/plants/add", dataObject)
      .then((res) => console.log(res.data))
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ username: "" });
    this.setState({ plantName: "" });
  }

  render() {
    return (
      <div>
        <h3>Create New Plant</h3>
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
            <input
              type="text"
              required
              className="form-control"
              value={this.state.plantName}
              onChange={this.onChangePlantName}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Plant"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

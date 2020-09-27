import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

const MoistureMeasurements = (props) => {
  console.log("PROPS:", props);
  return (
    <tr>
      <td>{props.moistureMeasurement.plantName}</td>
      <td>{props.moistureMeasurement.moistureReading}</td>
      <td>{props.moistureMeasurement.date.substring(0, 16)}</td>
      {/* <td>
        <Link to={"/edit/" + props.moistureMeasurements._id}>
          <button>edit</button>
        </Link>{" "}
        |{" "}
        <button
          onClick={() => {
            props.deleteExercise(props.moistureMeasurements._id);
          }}
        >
          delete
        </button>
      </td> */}
    </tr>
  );
};

export default class MoistureMeasurementList extends Component {
  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { moistureMeasurements: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/moistureMeasurements")
      .then((response) => {
        this.setState({ moistureMeasurements: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //   deleteExercise(id) {
  //     axios
  //       .delete("http://localhost:5000/exercises/" + id)
  //       .then((res) => console.log(res.data))
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     this.setState({
  //       exercises: this.state.exercises.filter((el) => el._id !== id),
  //     });
  //   }

  moistureMeasurementsList() {
    return this.state.moistureMeasurements.map((currentMeasurement) => {
      return (
        <MoistureMeasurements
          moistureMeasurement={currentMeasurement}
          //   deleteExercise={this.deleteExercise}
          key={currentMeasurement._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Moisture Measurements</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Plant Name</th>
              <th>Moisture Reading</th>
              <th>Date</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>{this.moistureMeasurementsList()}</tbody>
        </table>
      </div>
    );
  }
}

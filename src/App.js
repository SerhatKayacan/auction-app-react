import React, { Component } from "react";
import "./App.css";
import axios from "axios";
class App extends Component {
  state = {
    number1: null,
    number2: null,
    highestbid: null,
    highestbidder: null
  };

  //get datas and find max value
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users")
      .then(response => {
        this.setState({
          highestbid: Math.max(response.data[0].number, response.data[1].number)
        });
        if (this.state.highestbid === response.data[0].number) {
          this.setState({ highestbidder: "user1" });
        } else {
          this.setState({ highestbidder: "user2" });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  changeNumber1 = e => {
    this.setState({ number1: e.target.value });
  };

  changeNumber2 = e => {
    this.setState({ number2: e.target.value });
  };

  //change data[0] in database
  putNumber1 = () => {
    axios
      .put("http://localhost:5000/api/users/5ceb11431c9d440000ac4419", {
        number: this.state.number1
      })
      .then(res => console.log(res.data));
  };

  //change data[1] in database
  putNumber2 = () => {
    axios
      .put("http://localhost:5000/api/users/5ceb115c1c9d440000ac441a", {
        number: this.state.number2
      })
      .then(res => console.log(res.data));
  };

  //get datas and find max value
  getResult = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then(response => {
        this.setState({
          highestbid: Math.max(response.data[0].number, response.data[1].number)
        });
        if (this.state.highestbid === response.data[0].number) {
          this.setState({ highestbidder: "user1" });
        } else {
          this.setState({ highestbidder: "user2" });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="App">
        <div>
          <input
            type="number"
            placeholder="bid"
            onChange={this.changeNumber1}
          />
          <button onClick={this.putNumber1}>put</button>
          <br />
        </div>
        <div>
          <input
            type="number"
            placeholder="bid"
            onChange={this.changeNumber2}
          />
          <button onClick={this.putNumber2}>put</button>
          <br />
        </div>
        <div className="sonuc">
          <button onClick={this.getResult}>get</button>
          <p>highest bid: {this.state.highestbid} </p>
          <p>highest bidder: {this.state.highestbidder}</p>
        </div>
      </div>
    );
  }
}

export default App;

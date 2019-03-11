import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Quiz from "./Components/Quiz.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Quiz />
      </div>
    );
  }
}

export default App;

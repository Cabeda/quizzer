import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Quiz from "./Components/Quiz.component";
import QuizBuilder from './Components/QuizBuilder/QuizBuilder.component';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Quiz} />
        <Route path="/builder" component={QuizBuilder} />
        <Route component={Quiz}></Route>
      </Switch>
    </Router>
  );
}

export default App;

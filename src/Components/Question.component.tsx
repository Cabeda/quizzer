import React, { useState } from "react";
import { IQuestion } from "../Interfaces/Question.interface";

function Question(props: IQuestion) {
  return (
    <div>
      <p>{props.Question}</p>
      {
          props.Answers.map((item, key) =>
           <button>{item.Answer}</button>)
      }
    </div>
  );
}

export default Question;

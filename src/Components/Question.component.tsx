import React, { useState } from "react";
import { IQuestionProps } from "../Interfaces/Question.interface";

function Question(props: IQuestionProps) {
  return (
    <div>
      <p>{props.Question}</p>
      {
        props.Answers.map((item , key) =>
          <button
            key={item.Answer}
            title={item.Answer}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.Answered(event.currentTarget.title)}
          >{item.Answer}</button>)
      }
    </div>
  );
}

export default Question;

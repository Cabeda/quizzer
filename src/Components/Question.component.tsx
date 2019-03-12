import React, { useState } from "react";
import { IQuestionProps } from "../Interfaces/Question.interface";

import styled from 'styled-components';

const GridAnswers = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
`;

const QuizButton = styled.button`
    margin: 1rem;
    height: 2rem;
    border: none;
`;

function Question(props: IQuestionProps) {
  return (
    <div>
      <p>{props.Question}</p>
      <GridAnswers>
        {
          props.Answers.map((item, key) =>
              <QuizButton
                key={item.Answer}
                title={item.Answer}
                className= "accent-color"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.Answered(event.currentTarget.title)}
              >{item.Answer}</QuizButton>
          )
        }
      </GridAnswers>
    </div>
  );
}

export default Question;

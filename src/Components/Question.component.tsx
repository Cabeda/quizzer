import React, { useState } from "react";
import { IQuestionProps } from "../Interfaces/Question.interface";

import styled from 'styled-components';

const GridAnswers = styled.div`
  display:grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
`;

const ButtonContainer = styled.div`
	display: grid;
	grid-gap: 1rem;

  @media (max-width: 400px) {
  grid-template-columns: 1fr;
    
  }

  @media (min-width: 401px) {
  grid-column: 1 / span 4;
  grid-template-columns: 1fr 1fr;
    
  }
`;

const QuizButton = styled.button`
    min-height: 5rem;
    font-size: 1.5rem;
    font-weight: bold;
    border: none;
`;

const Image = styled.img`
  max-height:40vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const MainTitle = styled.h4`
  grid-column: 1 / span 4;
`;

function Question(props: IQuestionProps) {
  return (
    <GridAnswers>
      {
        (!props.Question.Image) ? null :
          <Image src={props.Question.Image} alt={props.Question.Question} title={props.Question.Question}></Image>
      }
      <MainTitle>{props.Question.Question}</MainTitle>
      <ButtonContainer>
      {
          props.Question.Answers.map((item, key) =>
            <QuizButton
            key={item.Answer}
            title={item.Answer}
            className="accent-color"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.Answered(event.currentTarget.title)}
          >{item.Answer}</QuizButton>
          )
        }
        </ButtonContainer>
      </GridAnswers>
  );
}

export default Question;

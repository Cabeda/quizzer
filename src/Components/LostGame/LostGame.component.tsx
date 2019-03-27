import React from 'react';
import styled from 'styled-components';

import { ILostGameProps } from './LostGame.interface';
import QuizOptions from '../QuizOption.component';
import { GameState } from './GameState';


const App = styled.div`
  text-align: center;
  min-height: 97vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #000;

`;
function LostGame(props: ILostGameProps) {

  switch (props.GameState) {
    case GameState.GaveUp:
      return (
        <App>
          <p>Desististe. Queres tentar de novo?</p>
          <p>Fase: {props.Phase}</p>
          <p>Resultado: {props.QuestionsAnswered}/{props.TotalQuestions}</p>
          <QuizOptions restartQuiz={props.restartQuiz} resetQuiz={props.resetQuiz} ></QuizOptions>
        </App>
      );
      break;
    default:
      return (
        <App>
          <p>Perdeste :s</p>
          <p>Fase: {props.Phase}</p>
          <p>Resultado: {props.QuestionsAnswered}/{props.TotalQuestions}</p>
          <p>Resposta correta: {props.Answer}</p>
          <QuizOptions restartQuiz={props.restartQuiz} resetQuiz={props.resetQuiz} ></QuizOptions>
        </App>
      );
      break;
  }
}


export default LostGame;
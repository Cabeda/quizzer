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
  color: white;

`;
function LostGame(props: ILostGameProps) {

  switch (props.GameState) {
    case GameState.GaveUp:
      return (
        <App>
          <p>You Gave Up. Want to try again?</p>
          <p>Phase: {props.Phase}</p>
          <p>Score: {props.QuestionsAnswered}/{props.TotalQuestions}</p>
          <QuizOptions restartQuiz={props.restartQuiz} resetQuiz={props.resetQuiz} ></QuizOptions>
        </App>
      );
      break;
    case GameState.Won:
      return (
        <App>
          <p>You Won!!! :)</p>
          <QuizOptions restartQuiz={props.restartQuiz} resetQuiz={props.resetQuiz} ></QuizOptions>
        </App>
      );
    default:
      return (
        <App>
          <p>You Lost :s</p>
          <p>Phase: {props.Phase}</p>
          <p>Score: {props.QuestionsAnswered}/{props.TotalQuestions}</p>
          <p>The correct answer is: {props.Answer}</p>
          <QuizOptions restartQuiz={props.restartQuiz} resetQuiz={props.resetQuiz} ></QuizOptions>
        </App>
      );
      break;
  }
}


export default LostGame;
import React, { useState, useCallback } from 'react';
import Question from './Question.component';
import { Quizzer } from '../Interfaces/Quizzer.interface.js';
import { ISfhuffledQuestion as IShuffledQuestion } from '../Interfaces/Shuffler.interface.js';
import { IPhase } from '../Interfaces/Phase.interface.js';
import Shuffle from '../Sorter';
import { IQuestion } from '../Interfaces/Question.interface';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import QuizOptions from './QuizOption.component';
import Progress from './Progress/Progress.component';
import LostGame from './LostGame/LostGame.component';
import { GameState } from './LostGame/GameState';
import { Link } from 'react-router-dom';

const Box = styled.div`
  display:grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr auto;
`;

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

const QuizButton = styled.button`
    height: 2rem;
    border: none;
    margin: 1rem;
`;


const LinkStyle = styled.button`
    background-color: #FFC107;
    color: black;
    font-size: 1rem;
    box-shadow: 2px 2px gray;
    text-decoration: none ;
    padding: 0.5rem;
    &:active {
      box-shadow: none;
  }
`;

const DropZone = styled.div`
  border-style: dashed;
  color: #FFF;
  border-width: 0.3rem;
  width: 95vw;
  height: 15vh;
`;


function Quiz() {
  // Declare a new state variable, which we'll call "count"
  const [questionsAnswered, setCount] = useState(0);
  const [] = useState(0);
  const [shuffledQuiz, setShuffle] = useState<Array<IShuffledQuestion>>([]);
  const [state, setGameState] = useState<GameState>(GameState.InGame);
  const [quiz, setQuiz] = useState<Quizzer>();
  const [time, setTime] = React.useState<number | null>(null);
  const [betweenQuestion, setBetweenQuestion] = useState(false);

  React.useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    if (time && !betweenQuestion) {
      if (time === 1)
        setGameState(GameState.Lost);
      else
        setTime(time - 1);
    }

  }

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {

      const binaryStr = reader.result

      if (binaryStr) {
        importQuiz(JSON.parse(binaryStr.toString()))
      } else {

      }
    }

    acceptedFiles.forEach((file: Blob) => reader.readAsText(file))

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  const importQuiz = (template: Quizzer) => {
    setQuiz(template);
    setTime(template.TimerSeconds);
    setGameState(GameState.InGame);
    shuffleIt(template);
  }

  const shuffleIt = (template: Quizzer) => {
    const newQuiz: Array<IShuffledQuestion> = template.Phases.map((phase) => {
      return shufflePhase(phase);
    }).flat();

    setShuffle(newQuiz);

  }


  const shufflePhase = (phase: IPhase): Array<IShuffledQuestion> => {
    let shuffled: Array<IQuestion> = Shuffle(phase.Questions)
      .slice(0, phase.NumberOfQuestions - 1);

    let shuffledQuestions: Array<IShuffledQuestion> = shuffled.map((Question) => {

      Question.Answers = Shuffle(Question.Answers); //Reshuffle answers order
      return { Phase: phase.Phase, Question };
    });

    return shuffledQuestions;
  }

  const answerQuestion = (answer: string) => {

    if (shuffledQuiz) {
      const an = shuffledQuiz[questionsAnswered].Question.Answers.find((item) => item.Answer === answer)

      if (an && !an.IsCorrect) {
        changeGameStatus(GameState.Lost);
      } else {
        setTime(quiz!.TimerSeconds);
        setCount(questionsAnswered + 1);

        if (quiz!.GiveUp)
          setBetweenQuestion(true);
      }
    }

  };

  const changeGameStatus = (state: GameState) => {

    switch (state) {
      case GameState.GaveUp:
        setGameState(GameState.GaveUp);
        break;
      case GameState.Lost:
        setGameState(GameState.Lost);
        break;
      default:
        break;
    }

    setBetweenQuestion(false);
  }

  const restartQuiz = () => {
    setCount(0);
    setTime(null);
    setGameState(GameState.InGame);
    importQuiz(quiz!);
  }

  const resetQuiz = () => {
    setCount(0);
    setTime(null);
    setGameState(GameState.InGame);
    setQuiz(undefined);
    setShuffle([]);

  }

  if (quiz && betweenQuestion)
    return (
      <App>
        <p>Wanna keep going?</p>
        <QuizButton className="accent-color" onClick={() => changeGameStatus(GameState.InGame)}>Yes! One More!</QuizButton>
        <QuizButton className="accent-color" onClick={() => changeGameStatus(GameState.GaveUp)}>Nope</QuizButton>
      </App>
    );


  if ((state === GameState.Lost || state === GameState.GaveUp) && quiz)
    return (
      <App>
        <LostGame
          GameState={state}
          Phase={shuffledQuiz[questionsAnswered].Phase}
          QuestionsAnswered={questionsAnswered}
          TotalQuestions={shuffledQuiz.length}
          Answer={shuffledQuiz[questionsAnswered].Question.Answers.find((item) => item.IsCorrect)!.Answer}
          restartQuiz={restartQuiz} resetQuiz={resetQuiz}></LostGame>
      </App>
    );

  if (shuffledQuiz && shuffledQuiz.length > 0 && questionsAnswered === shuffledQuiz.length)
    return (
      <App>
        <p>You Won!!! :)</p>
        <QuizOptions restartQuiz={restartQuiz} resetQuiz={resetQuiz} ></QuizOptions>
      </App>
    );

  if (shuffledQuiz && quiz && shuffledQuiz.length > 0)
    return (
      <div>
        <Progress QuestionsAnswered={questionsAnswered} TotalQuestions={shuffledQuiz.length}></Progress>
        <App>
          {time && <h4>{time}</h4>}
          <p>{quiz.Title} - {questionsAnswered + 1}</p>
          <p>{shuffledQuiz[questionsAnswered].Phase}</p>
          <Question Answered={answerQuestion} Question={shuffledQuiz[questionsAnswered].Question} ></Question>
          <QuizOptions restartQuiz={restartQuiz} resetQuiz={resetQuiz} ></QuizOptions>
        </App>
      </div>
    );


  return (
    <App>
      <Box>
        <h1>Quizzer</h1>
        <p>A JSON based quiz shuffler.</p>
        <DropZone {...getRootProps()}>
          <input {...getInputProps()} accept=".json" />
          {
            isDragActive ?
              <p>Drop the json file here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </DropZone>
        {/* <h3>Or</h3>
        <LinkStyle>
          <Link to="/builder"> Create with the Builder</Link>
        </LinkStyle> */}
      </Box>
    </App>
  );
}

export default Quiz;
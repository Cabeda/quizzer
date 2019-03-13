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

const Box = styled.div`
  display:grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr auto;
`;


const Link = styled.a`
    background-color: #FFC107;
    color: #FFFFFF;
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
  const [onGame, setGameStatus] = useState(true);
  const [quiz, setQuiz] = useState<Quizzer>();

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

    acceptedFiles.forEach((file: Blob) => reader.readAsBinaryString(file))

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  const importQuiz = (template: Quizzer) => {
    setQuiz(template);
    shuffleIt(template);
  }

  const shuffleIt = (template: Quizzer) => {
    const newQuiz: Array<IShuffledQuestion> = template.Phases.map((phase) => {
      return shufflePhase(phase);
    }).flat();

    setShuffle(newQuiz);

  }


  const shufflePhase = (phase: IPhase): Array<IShuffledQuestion> => {
    let shuffled: Array<IQuestion> = Shuffle(phase.Questions).slice(0, phase.NumberOfQuestions - 1);
    let shuffledQUestions: Array<IShuffledQuestion> = shuffled.map((Question) => {
      return { Phase: phase.Phase, Question };
    });

    return shuffledQUestions;
  }

  const answerQuestion = (answer: string) => {

    if (shuffledQuiz) {
      const an = shuffledQuiz[questionsAnswered].Question.Answers.find((item) => item.Answer === answer)

      if (an && !an.IsCorrect) {

        setGameStatus(false);
      } else {

        setCount(questionsAnswered + 1);
      }
    }

  };

  const restartQuiz = () => {
    setCount(0);
    setGameStatus(true);

    if (quiz)
      importQuiz(quiz);
  }

  const resetQuiz = () => {
    setCount(0);
    setGameStatus(true);
    setQuiz(undefined);
    setShuffle([]);
  }


  if (!onGame)
    return (
      <div>
        <p>You lost :s</p>
        <p>Phase: {shuffledQuiz[questionsAnswered].Phase}</p>
        <p>Score: {questionsAnswered}/{shuffledQuiz.length + 1}</p>
        <QuizOptions restartQuiz={restartQuiz} resetQuiz = {resetQuiz} ></QuizOptions>
      </div>
    );

  if (shuffledQuiz && shuffledQuiz.length > 0 && questionsAnswered === shuffledQuiz.length)
    return (
      <div>
        <p>You Won!!! :)</p>
        <QuizOptions restartQuiz={restartQuiz} resetQuiz = {resetQuiz} ></QuizOptions>
      </div>
    );

  if (shuffledQuiz && quiz && shuffledQuiz.length > 0)
    return (<div>
      <p>{quiz.Title} - {questionsAnswered + 1}</p>
      <p>{shuffledQuiz[questionsAnswered].Phase}</p>
      <Question Answered={answerQuestion} Question={shuffledQuiz[questionsAnswered].Question.Question} Answers={shuffledQuiz[questionsAnswered].Question.Answers}></Question>
      <QuizOptions restartQuiz={restartQuiz} resetQuiz = {resetQuiz} ></QuizOptions>
    </div>);




  return (

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
        <Link href='https://gist.githubusercontent.com/Cabeda/69c1713a6b78100a615f72e7e896ce5b/raw/965419ab56cf00ce6f5529a70eef7aae8ab26346/template-quiz.json' target="_blank">Download Template Quiz</Link>
    </Box>
  );
}

export default Quiz;
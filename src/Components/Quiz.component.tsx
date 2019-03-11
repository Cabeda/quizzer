import React, { useState, useCallback } from 'react';
import template from '../static/quiz-template';
import Question from './Question.component';
import { Quizzer } from '../Interfaces/Quizzer.interface.js';
import { ISfhuffledQuestion as IShuffledQuestion } from '../Interfaces/Shuffler.interface.js';
import { IPhase } from '../Interfaces/Phase.interface.js';
import Shuffle from '../Sorter';
import { IQuestion } from '../Interfaces/Question.interface';
import { IAnswer } from '../Interfaces/Answer.interface';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

// Create a Wrapper component that'll render a <section> tag with some styles
const Buttonizer = styled.button`
    background-color: darkgrey;
    border-radius: 10%;

`;


function Quiz() {
  // Declare a new state variable, which we'll call "count"
  const [questionsAnswered, setCount] = useState(0);
  const [currentPhase] = useState(0);
  const [shuffledQuiz, setShuffle] = useState<Array<IShuffledQuestion>>([]);
  const [onGame, setGameStatus] = useState(true);
  const [quiz, setQuiz] = useState<Quizzer>();

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {

      const binaryStr = reader.result

      if(binaryStr)
      {
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
      
      if(quiz)
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
        <button onClick= {restartQuiz}>Restart</button>
        <button onClick= {resetQuiz}>Reset</button>
      </div>
    );

  if (shuffledQuiz && shuffledQuiz.length > 0 && questionsAnswered === shuffledQuiz.length)
    return (
      <div>
        <p>You Won!!! :)</p>
        <button onClick= {restartQuiz}>Restart</button>
        <button onClick= {resetQuiz}>Reset</button>
      </div>
    );

  if (shuffledQuiz && quiz && shuffledQuiz.length > 0)
    return (<div>
      <p>{quiz.Title} - {questionsAnswered + 1}</p>
      <p>{shuffledQuiz[questionsAnswered].Phase}</p>
      <Question Answered={answerQuestion} Question={shuffledQuiz[questionsAnswered].Question.Question} Answers={shuffledQuiz[questionsAnswered].Question.Answers}></Question>
      <button onClick= {restartQuiz}>Restart</button>
    </div>);




  return (

    <div>
      <h1>Quizzer</h1>
      <p>A JSON based quiz shuffler.</p>
      {/* <button onClick={() => importQuiz(template)}>Import Template Quiz</button> */}
      <a href='https://gist.githubusercontent.com/Cabeda/69c1713a6b78100a615f72e7e896ce5b/raw/965419ab56cf00ce6f5529a70eef7aae8ab26346/template-quiz.json' target="_blank">Download Template Quiz</a>
      <div {...getRootProps()}>
      <input {...getInputProps()} accept=".json" />
      {
        isDragActive ?
          <p>Drop the json file here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    </div>
  );
}

export default Quiz;
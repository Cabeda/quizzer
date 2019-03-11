import React, { useState } from 'react';
import template from '../static/quiz-template';
import Question from './Question.component';
import { Quizzer } from '../Interfaces/Quizzer.interface.js';
import { ISfhuffledQuestion as IShuffledQuestion } from '../Interfaces/Shuffler.interface.js';
import { IPhase } from '../Interfaces/Phase.interface.js';
import Shuffle from '../Sorter';
import { IQuestion } from '../Interfaces/Question.interface';

function Quiz() {
  // Declare a new state variable, which we'll call "count"
  const [questionsAnswered, setCount] = useState(0);
  const [currentPhase] = useState(0);
  const [shuffledQuiz, setShuffle] = useState<Array<IShuffledQuestion>>();
  const [onGame] = useState(true);
  const [quiz, setQuiz] = useState<Quizzer>();


  const importQuiz = (template: Quizzer) => {
    setQuiz(template);
    shuffleIt(template);
  }

  const shuffleIt = (template: Quizzer) => {
    const newQuiz: Array<IShuffledQuestion> = template.Phases.map((phase) => {
      return shufflePhase(phase);
    }).flat();

    setShuffle(newQuiz);

    console.log(newQuiz);

  }


  const shufflePhase = (phase: IPhase): Array<IShuffledQuestion> => {
    let shuffled: Array<IQuestion> = Shuffle(phase.Questions).slice(0, phase.NumberOfQuestions - 1);
    let shuffledQUestions: Array<IShuffledQuestion> = shuffled.map( (Question) => {
        return {Phase: phase.Phase, Question}; 
    });
      
    return shuffledQUestions;
  }

  const answerQuestion = (answer: string) => {
    console.log(answer);

    
    setCount(questionsAnswered + 1);
  };



  if (!onGame)
    return (
      <div>
        <p>You lost :s</p>
        <p>Score: </p>
      </div>
    );

    if(shuffledQuiz && questionsAnswered === shuffledQuiz.length) 
    return (
      <div>
      <p>You Won!!! :)</p>
    </div>
    );

  if (shuffledQuiz && quiz)
    return (<div>
      <p>{quiz.Title} - {questionsAnswered}</p>
      <p>{shuffledQuiz[questionsAnswered].Phase}</p>
      <Question Answered={answerQuestion} Question={shuffledQuiz[questionsAnswered].Question.Question} Answers={shuffledQuiz[questionsAnswered].Question.Answers}></Question>
    </div>);




  return (

    <div>
      <h1>Quizzer</h1>
      <button onClick={() => importQuiz(template)}>Import Template Quiz</button>
    </div>
  );
}

export default Quiz;
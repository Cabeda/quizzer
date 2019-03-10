import React, { useState } from 'react';
import template from '../static/quiz-template';
import Question from './Question.component';
import { Quizzer } from '../Interfaces/Quizzer.interface.js';
import { IShuffler } from '../Interfaces/Shuffler.interface.js';
import { IPhase } from '../Interfaces/Phase.interface.js';
import Shuffle from '../Sorter';
import { IQuestion } from '../Interfaces/Question.interface';

function Quiz() {
  // Declare a new state variable, which we'll call "count"
  const [questionsAnswered, setCount] = useState(0);
  const [currentPhase] = useState(0);
  const [shuffledQuiz, setShuffle] = useState<Array<IShuffler>>();
  const [onGame] = useState(true);
  const [quiz, setQuiz] = useState<Quizzer>();


  const importQuiz = (template: Quizzer) => {
    setQuiz(template);
    shuffleIt(template);
  }

  const shuffleIt = (template: Quizzer) => {
    const newQuiz: Array<IShuffler> = template.Phases.map((phase) => {
        return shufflePhase(phase);
     });

    setShuffle(newQuiz);

    console.log(newQuiz);
    
  }


  const shufflePhase = (phase: IPhase): IShuffler => {
    let Questions: Array<IQuestion> = Shuffle(phase.Questions).slice(0, phase.NumberOfQuestions - 1);

    return { Phase: phase.Phase, Questions };
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



  if (quiz)
    return (<div>
      <p>{quiz.Title}</p>
      <p>{quiz.Phases[currentPhase].Phase}</p>
      <Question Answered={answerQuestion} Question={quiz.Phases[0].Questions[0].Question} Answers={quiz.Phases[0].Questions[0].Answers}></Question>
    </div>);




  return (

    <div>
      <h1>Quizzer</h1>
      <button onClick={() => importQuiz(template)}>Import Template Quiz</button>
    </div>
  );
}

export default Quiz;
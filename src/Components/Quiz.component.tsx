import React, { useState } from 'react';
import json from '../static/quiz-template.json';
import template from '../static/quiz-template';
import Question from './Question.component';
import { Quizzer } from '../Interfaces/Quizzer.interface.js';
import { IShuffler } from '../Interfaces/Shuffler.interface.js';

function Quiz() {
    // Declare a new state variable, which we'll call "count"
    const [questionsAnswered, setCount] = useState(0);
    const [currentPhase, setPhase] = useState(0);
    const [shuffler, setShuffler] = useState<Array<IShuffler>>();
    const [onGame, setQuizState] = useState(true);
    const [quiz, setQuiz] = useState<Quizzer>();

    if(!onGame)
    return (
        <div>
            <p>You lost :s</p>
            <p>Score: </p>
        </div>
    );

    const answerQuestion = (answer: string) => {
        

        setCount(questionsAnswered + 1);
    };

    if(quiz)
    return (<div>
        <p>{quiz.Title}</p>
        <p>{quiz.Phases[currentPhase].Phase}</p>
        <Question Question={quiz.Phases[0].Questions[0].Question} Answers= {quiz.Phases[0].Questions[0].Answers}></Question>
    </div>);


    return (
        
      <div>
        <h1>Quizzer</h1>
        <button onClick={() => setQuiz(template)}>Import Template Quiz</button>
      </div>
    );
  }

export default Quiz;
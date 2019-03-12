import React from 'react';
import styled from 'styled-components';

const QuizButton = styled.button`
    height: 2rem;
    border: none;
`; 

function QuizOptions (props: any) {

    return (<div>
        <QuizButton className= "accent-color " onClick={props.restartQuiz}>Restart</QuizButton>
        <QuizButton className= "accent-color " onClick={props.resetQuiz}>Reset</QuizButton>
    </div>);
}

export default QuizOptions;
import React from 'react';
import styled from 'styled-components';
import {IQuizOptions} from '../Interfaces/QuizOptions.interface';

const OptionsBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100%;
`;

const QuizButton = styled.button`
    height: 2rem;
    border: none;
    margin: 1rem;
`; 

function QuizOptions (props: IQuizOptions) {

    return (<OptionsBox>
        <QuizButton className= "accent-color" onClick={props.restartQuiz}>Restart</QuizButton>
        <QuizButton className= "accent-color" onClick={props.resetQuiz}>Reset</QuizButton>
    </OptionsBox>);
}

export default QuizOptions;
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Quizzer } from '../../Interfaces/Quizzer.interface';
import json from '../../static/template-quiz.json';
import PhaseBuilder  from './PhaseBuilder';

const App = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.3em 0.6em;
`;

const Fieldset = styled.fieldset`
 max-width: 40em;
  padding: 4px;
  margin: 2em auto;
  border: 0 none;
`;


const QuizButton = styled.button`
    height: 2rem;
    border: none;
    margin: 1rem;
`;


const LinkStyle = styled.a`
    background-color: #FFC107;
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

function QuizBuilder() {
    const [quiz, setQuiz] = useState<Quizzer>(json as Quizzer);
    const [hasTimer, setHasTimer] = useState(true);

    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            const binaryStr = reader.result
            if (binaryStr) {
                setQuiz(JSON.parse(binaryStr.toString()));
            } else {
            }
        }

        acceptedFiles.forEach((file: Blob) => reader.readAsText(file))

    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuiz = { ...quiz };
        newQuiz.Title = e.target.value
        setQuiz(newQuiz);
    }

    const handleGiveUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuiz = { ...quiz };
        newQuiz.GiveUp = e.target.checked;
        setQuiz(newQuiz);
    }

    const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuiz = { ...quiz };
        newQuiz.TimerSeconds = Number.parseInt(e.target.value);
        setQuiz(newQuiz);
    }

    const addPhase = (name: string, NumberOfQuestions: number) => {
        quiz.Phases.push({Phase: name, NumberOfQuestions, Questions:[]});
    } 

    const removeQuestion = (name: string, ) => {
        
    }


    return (
        <App>
            <LinkStyle>
                <Link to="/">Return to main</Link>
            </LinkStyle>
            <h1>Quiz Builder</h1>
            <DropZone {...getRootProps()}>
                <input {...getInputProps()} accept=".json" />
                {
                    isDragActive ?
                        <p>Drop the json file here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </DropZone>

            <form>
                <Fieldset>
                    <Container>
                        <label>
                            Title:
                <input type="text" onChange={handleTitleChange} value={quiz.Title}></input>
                        </label>
                        <label>
                            Set Timer:
                <input type="checkbox" onChange={(e) => setHasTimer(e.target.checked)} checked={hasTimer}></input>
                        </label>
                        {
                            hasTimer && (
                                <label>
                                    Timer Seconds:
                <input type="number" onChange={handleTimerChange} min="0" value={quiz.TimerSeconds ? quiz.TimerSeconds : 0}></input>
                                </label>
                            )
                        }
                        <label>
                            Give Up Option:
                <input type="checkbox" onChange={handleGiveUpChange} checked={quiz.GiveUp ? quiz.GiveUp : false}></input>
                        </label>
                        {
                            quiz.Phases.map((x) => <PhaseBuilder {...x}></PhaseBuilder>)
                        }
                    </Container>
                </Fieldset>
            </form>
            <LinkStyle href={`data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(quiz))}`} target="_blank" download={`${quiz.Title}.json`} >Download Template Quiz</LinkStyle>
        </App>
    );
}


export default QuizBuilder;
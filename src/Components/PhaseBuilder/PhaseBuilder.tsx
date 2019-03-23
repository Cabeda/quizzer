import React from 'react';
import { IPhaseBuilderProps } from './phaseBuilder.interface';

function PhaseBuilder(props: IPhaseBuilderProps) {

    return (
        <div>
            <label>
                Phase Name:
            <input value={props.Phase.Phase} onChange={(e) => props.onPhaseNameChange(props.Phase.Phase, e.currentTarget.value)}></input>
            </label>
            <label>
                Number Of Questions:
            <input type="number" value={props.Phase.NumberOfQuestions} onChange={(e) => props.onNumberOfQuestionsChange(props.Phase.Phase, e.currentTarget.value)}></input>
            </label>
            <button onClick={props.addQuestion}>Add Question</button>
        </div>
    );
}


export default PhaseBuilder;

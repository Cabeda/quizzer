import React from 'react';
import { IPhase } from '../../Interfaces/Phase.interface';

function PhaseBuilder(props: IPhase) {
    
    const handleNumberOFQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhase = { ...props };
        newPhase.NumberOfQuestions = Number.parseInt(e.target.value);
        // setPhase(newPhase);
    }

    return (
        <div>
            <p>{props.Phase}</p>
            {
                <input value={props.NumberOfQuestions} ></input>
            }
        </div>
    );
}


export default PhaseBuilder;

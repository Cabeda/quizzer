import React from 'react';
import { Line } from 'rc-progress';
import { IProgressProps } from './Progress.interface';

function Progress(props: IProgressProps) {

    return (
        <div>
            <Line percent={(props.QuestionsAnswered/props.TotalQuestions)*100} strokeWidth="2" strokeColor="#FFC107" />
        </div>
    );
}

export default Progress;
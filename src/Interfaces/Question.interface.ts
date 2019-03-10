import { IAnswer } from "./Answer.interface";

export interface IQuestion {
    Question: string,
    Answers: Array<IAnswer>
}


export interface IQuestionProps {
    Answered(answer: string): void,
    Question: string,
    Answers: Array<IAnswer>
}
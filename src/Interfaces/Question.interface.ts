import { IAnswer } from "./Answer.interface";

export interface IQuestion {
    Question: string,
    Image?: string,
    Answers: Array<IAnswer>
}


export interface IQuestionProps {
    Answered(answer: string): void,
    Timer: number | null,
    Question: IQuestion
}
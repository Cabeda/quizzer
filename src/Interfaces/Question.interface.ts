import { IAnswer } from "./Answer.interface";

export interface IQuestion {
    Question: string,
    Answers: Array<IAnswer>
}
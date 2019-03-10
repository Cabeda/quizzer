import { IQuestion } from "./Question.interface";

export interface IPhase {
    Phase: string,
    NumberOfQuestions: number,
    Questions: Array<IQuestion>
}

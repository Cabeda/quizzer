import { IQuestion } from "./Question.interface";

export interface IShuffler {
    Phase: string,
    Questions: Array<IQuestion>
}
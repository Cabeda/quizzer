import { IPhase } from "./Phase.interface";

export interface Quizzer {
    Title: string,
    TimerSeconds: number | null,
    Phases: Array<IPhase>
}
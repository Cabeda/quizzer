import { IPhase } from "./Phase.interface";

export interface Quizzer {
    Title: string,
    TimerSeconds: number | null,
    GiveUp: boolean | null,
    Phases: Array<IPhase>
}
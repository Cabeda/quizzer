import {GameState} from './GameState';

export interface ILostGameProps {
    GameState: GameState,
    Phase:string,
    QuestionsAnswered: number,
    TotalQuestions: number,
    Answer: string,
    restartQuiz: () => void,
    resetQuiz: () => void
}
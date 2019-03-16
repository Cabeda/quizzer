export interface ILostGameProps {
    FinalMessage: string,
    Phase:string,
    QuestionsAnswered: number,
    TotalQuestions: number,
    Answer: string,
    restartQuiz: () => void,
    resetQuiz: () => void
}
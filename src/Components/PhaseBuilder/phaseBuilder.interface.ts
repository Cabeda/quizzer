import { IPhase } from "../../Interfaces/Phase.interface";

export interface IPhaseBuilderProps {
    Phase: IPhase;
    onNumberOfQuestionsChange: (phaseName: string, numberOfQuestions: string) => void;
    onPhaseNameChange: (phaseName:string, Name: string) => void;
    addQuestion: (event: React.MouseEvent<HTMLButtonElement>) => void
}
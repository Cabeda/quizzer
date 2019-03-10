import { Quizzer } from "../Interfaces/Quizzer.interface";

var template: Quizzer = {
  Title: "Quiz teste",
  Phases: [
    {
      Phase: "Easy",
      NumberOfQuestions: 5,
      Questions: [
        {
          Question: "In what year was 1984 written?",
          Answers: [
            {
              Answer: "1984",
              IsCorrect: true
            },
            {
              Answer: "1979",
              IsCorrect: false
            },
            {
              Answer: "1973",
              IsCorrect: false
            },
            {
              Answer: "1970",
              IsCorrect: false
            }
          ]
        }
      ]
    },
    {
      Phase: "Medium",
      NumberOfQuestions: 5,
      Questions: [
        {
          Question: "In what year was The Three Mosqueteers written?",
          Answers: [
            {
              Answer: "1984",
              IsCorrect: true
            },
            {
              Answer: "1979",
              IsCorrect: false
            },
            {
              Answer: "1973",
              IsCorrect: false
            },
            {
              Answer: "1970",
              IsCorrect: false
            }
          ]
        }
      ]
    },
    {
      Phase: "Hard",
      NumberOfQuestions: 5,
      Questions: [
        {
          Question:
            "In what year was Harry Potter and the Philosopher Stone written?",
            Answers: [
                {
                  Answer: "1984",
                  IsCorrect: true
                },
                {
                  Answer: "1979",
                  IsCorrect: false
                },
                {
                  Answer: "1973",
                  IsCorrect: false
                },
                {
                  Answer: "1970",
                  IsCorrect: false
                }
              ]
        }
      ]
    }
  ]
};

export default template;

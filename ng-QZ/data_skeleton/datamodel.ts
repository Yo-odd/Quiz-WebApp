export interface User {
  _id: string;
  userName: string;
  password?: string;
  email?: string;
  role?: string;
  repassword?: string;
}

export interface Quiz {
  _id: string;
  quizTitle: string;
  creator: string;
  quizExp: string;
  quizTime: string;
  quizData: QuestionAnswersDto[];
}

export interface QuizContent {
  _id: string;
  questionOrder?: number;
  quizQes: string;
  quizOpt: [];
  quizAns: string;
}

// -------------------------------------------------------------------------------------
export interface AnswerDto {

  // answer content
  answerContent: string;
  // default to display
  isDefaut?: boolean;

}

export interface QuestionDto {

  // question content
  questionContent: string;
  // question order
  questionOrder?: number;
  // default to display
  isDefaut?: boolean;

}



export interface QuestionAnswersDto {

  question: QuestionDto;
  answers: AnswerDto[];
  quizAns?: string;

}

export interface ResultSchema {
  user_id: string;
  quiz_attendee:string;
  role: string;
  pending_quiz_id?: string[];
  attempted_quiz?: QuizSubmission[];
}

export interface QuizSubmission {
  quiz_id: string;
  attemptDate: string;
  question: [{
    questionContent: string;
    questionOrder: number;
    submittedAns: string;
    correct: boolean;
  }];
}

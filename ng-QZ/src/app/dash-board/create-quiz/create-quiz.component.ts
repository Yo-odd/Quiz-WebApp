import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { User, Quiz, QuizContent, QuestionDto, QuestionAnswersDto, AnswerDto } from 'data_skeleton/datamodel';
// import { QuizComponent } from 'src/app/quiz/quiz.component';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  qaList: QuestionAnswersDto[];
  quiz: Quiz = {
    _id: undefined,
    quizTitle: '',
    creator: undefined,
    quizExp: '',
    quizTime: '',
    quizData: []
  };
  res: any;
  res2: any;
  index: number;
  optionsArray = [];
  questionsArray = [];
  qes_no: number=1;

  constructor(private Quiz_Service: QuizService, private http: HttpClient, public router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    // init data
    this.qaList = [{
      question: <QuestionDto>{ questionContent: 'Do you have any hobbies?', questionOrder: 0, isDefaut: true },
      answers: [
        <AnswerDto>{ answerContent: 'I like to swim.', isDefaut: true },
        <AnswerDto>{ answerContent: 'I like to play basketball.', isDefaut: false },
        <AnswerDto>{ answerContent: 'I like to play badminton.', isDefaut: false }
      ]
    }];
  }

  addQuestionByIndex(qIndex) {
    const newQ = {
      question: { questionContent: '', questionOrder: qIndex, isDefaut: true },
      answers: []
    };
    this.qaList.splice(qIndex, 0, newQ);
    this.addOptions(qIndex);
  }

  removeQuestionByIndex(qIndex: number) {
    if (qIndex > -1) {
      this.qaList.splice(qIndex, 1);
    }
  }

  addOptions(qIndex: number) {
    const newA = { answerContent: '', isDefaut: false };
    this.qaList[qIndex].answers.push(newA);
  }

  removeOptions(answers: any[], aIndex) {
    if (aIndex > -1) {
      answers.splice(aIndex, 1);
    }
  }

  // Using trackby makes ngfor index correctly.
  // fix: ng-reflect-model shows correct value but not reflecting in input
  customQTrackBy(index: number, item: any): any {
    return index;
  }

  customATrackBy(index: number, item: any): any {
    return index;
  }

  async createQuiz(createQuizForm: NgForm) {
    event.preventDefault();
    // this.user=createQuizForm.value;
    /** spinner starts on init */
    // this.spinner.show();


    

    // this.quizContent.quizQes=this.qaList['quizData'][0];
    // this.quizContent.quizAns=this.qaList['quizData']['quizAns'];
    // this.quizContent.quizOpt=this.qaList['quizData']['answers'];
    // this.quizContent.questionOrder=this.qaList['quizData']['questionOrder'];

    // this.quiz.quizData.quizOpt.push(this.qaList.)

    this.quiz.quizData = this.qaList;
    
    if(!!createQuizForm.valid)
    {
      this.Quiz_Service.registerQuiz(this.quiz).subscribe(data => {
        console.log(data);
        this.res = data;
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
      },
        err => {
          this.res = err;
          console.log(err);
        });
    }


    // this.res = createQuizForm.value;
    this.res = this.quiz.quizData;
    this.res2 = this.quiz;
    console.log(this.res);
    console.log(this.res2.quizData);

  }

}

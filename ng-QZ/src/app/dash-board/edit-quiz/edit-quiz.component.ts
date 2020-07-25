import { Component, OnInit } from '@angular/core';
import { QuestionAnswersDto, Quiz, QuestionDto, AnswerDto } from 'data_skeleton/datamodel';
import { QuizService } from 'src/app/quiz.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  qaList: QuestionAnswersDto[];
  quiz: Quiz = {
    _id: undefined,
    quizTitle: '',
    creator: undefined,
    quizExp: '',
    quizTime: '',
    quizData: []
  };
  // tg_date : Date = new Date();
  res: any;
  res2: any;
  index: number;
  quizTitleArray = [];
  qes_no: number = 0;
  selectedtitle: any;

  constructor(private Quiz_Service: QuizService, private http: HttpClient, public router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    // init data
    this.qaList = [
      //   question: <QuestionDto>{ questionContent: 'Do you have any hobbies?', questionOrder: 0, isDefaut: true },
      //   answers: [
      //     <AnswerDto>{ answerContent: 'I like to swim.', isDefaut: true },
      //     <AnswerDto>{ answerContent: 'I like to play basketball.', isDefaut: false },
      //     <AnswerDto>{ answerContent: 'I like to play badminton.', isDefaut: false }
      //   ]
    ];

    this.Quiz_Service.getQuizzes().subscribe(data => {
      console.log(data);
      this.res = data;

      // for (let index = 0; index < this.res.length; index++) {
      // let element = this.res[index];
      // this.quiz.quizTitle = element.quizTitle;
      // this.quiz.quizExp = element.quizExp;
      // this.quiz.quizTime = element.quizTime;
      // this.quiz.quizData = element.quizData;
      // this.qaList = element.quizData;
      // this.optionsArray.push(element.quizTitle);
      // this.optionsArray.splice(this.qes_no, 0, this.quiz);
      // }

      // for (const element of data.payload.result) {
      //   this.quiz.quizExp = element.quizExp;
      //   this.quiz.quizTime = element.quizTime;
      //   this.quiz.quizTitle = element.quizTitle;
      //   this.quiz.quizData = element.quizData;
      //   this.qaList = element.quizData;
      //   // this.optionsArray.push(this.quiz);
      //   this.optionsArray.splice(this.qes_no, 0, this.quiz);
      //   this.qes_no = this.qes_no + 1;
      // }

      this.res.payload.result.forEach(element => {
        // this.quiz.quizTitle = element.quizTitle;
        // this.quiz.quizExp = element.quizExp;
        // this.quiz.quizTime = element.quizTime;
        // this.quiz.quizData = element.quizData;
        // this.qaList = element.quizData;
        this.quizTitleArray.push(element.quizTitle);
        // this.quizArray.splice(this.qes_no++, 0, this.quiz);
      });

      console.log('quizTitleArray:', this.quizTitleArray);

      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    },
      err => {
        this.res = err;
        console.log(err);
      });
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

  editQz() {
    this.quiz.quizTitle = this.selectedtitle;
    console.log(this.selectedtitle);
    
    this.Quiz_Service.getQuizDetails(this.quiz).subscribe(data => {
      console.log(data);
      this.res = data;

      this.res.payload.result.forEach(element => {
        this.quiz.quizTitle = element.quizTitle;
        this.quiz.quizExp = moment(element.quizExp).local().format('YYYY-MM-DD');
        this.quiz.quizTime = element.quizTime;
        this.quiz.quizData = element.quizData;
        this.qaList = element.quizData;
        this.quizTitleArray.push(element.quizTitle);
        // this.quizArray.splice(this.qes_no++, 0, this.quiz);
      });

      this.res=this.quiz.quizExp;
      console.log('quizTitleArray:', this.quizTitleArray);

      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    },
      err => {
        this.res = err;
        console.log(err);
      });
  }

  deleteQz() {
    // this.quiz.quizTitle = this.selectedtitle;
    console.log(this.selectedtitle);
    
    this.Quiz_Service.deleteQuiz(this.selectedtitle).subscribe(data => {
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

  // Using trackby makes ngfor index correctly.
  // fix: ng-reflect-model shows correct value but not reflecting in input
  customQTrackBy(index: number, item: any): any {
    return index;
  }

  customATrackBy(index: number, item: any): any {
    return index;
  }
  customQZTrackBy(index: number, item: any): any {
    return index;
  }

  async editQuiz(createQuizForm: NgForm) {
    event.preventDefault();

    this.quiz.quizData = this.qaList;

    if (!!createQuizForm.valid) {
      this.Quiz_Service.updateQuiz(this.quiz).subscribe(data => {
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


    this.res = createQuizForm.value;
    // this.res = this.quiz.quizData;
    this.res2 = this.quiz;
    console.log(this.res);
    console.log(this.res2.quizData);

  }

}

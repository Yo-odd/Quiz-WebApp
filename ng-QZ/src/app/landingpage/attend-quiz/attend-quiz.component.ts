import { Component, OnInit } from '@angular/core';
import { ResultSchema, Quiz, User, QuizSubmission } from 'data_skeleton/datamodel';
import { ResultService } from 'src/app/result.service';
import { QuizService } from 'src/app/quiz.service';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-attend-quiz',
  templateUrl: './attend-quiz.component.html',
  styleUrls: ['./attend-quiz.component.scss']
})
export class AttendQuizComponent implements OnInit {

  constructor(private Reslut_Service: ResultService, private Quiz_Service: QuizService, private User_Service: AuthService, public router: Router, private spinner: NgxSpinnerService, public route: ActivatedRoute) { }
  // uList: QuestionAnswersDto[];
  // p_qid = [];
  // uList: User[] = [];

  // searchText = '';
  // isHidden: boolean[] = [false];

  // result: ResultSchema[] = [];
  submit_quiz: QuizSubmission ={
  quiz_id: '',
  attemptDate: moment().format(),
  question: [undefined],
  };
  result: ResultSchema = {
    user_id: '',
    quiz_attendee: '',
    role: '',
    pending_quiz_id: [] = [],
    attempted_quiz: [] = []
  };

  quiz: Quiz = {
    _id: undefined,
    quizTitle: '',
    creator: undefined,
    quizExp: '',
    quizTime: '',
    quizData: []
  };

  // retrive_quiz: Quiz[] = [{
  //   _id: undefined,
  //   quizTitle: '',
  //   creator: undefined,
  //   quizExp: '',
  //   quizTime: '',
  //   quizData: []
  // }];

  // tg_date : Date = new Date();
  res: any;
  res2: any;
  quizInsights = [];
  // quizInsights = [{
  //   quiz_attendee: '',
  //   role: '',
  //   creator: '',
  //   pending_quiz_id: '',
  //   quizTitle: '',
  //   updatedAt: ''
  // }];
  index: number;
  selected_title_id: any;
  selected_title: any;
  user: User = {
    _id: undefined,
    email: '',
    userName: '',
    password: '',
    role: '',
    repassword: ''
  };
  creator: User = {
    _id: undefined,
    email: '',
    userName: '',
    password: '',
    role: '',
    repassword: ''
  };

  //  --------------------------------ngOnInit
  ngOnInit(): void {
    this.quiz._id = localStorage.getItem('quiz_id');
    this.submit_quiz.quiz_id = localStorage.getItem('quiz_id');
    this.result.user_id=localStorage.getItem('_id');
    // this.result.role=localStorage.getItem('role');
    // this.result.quiz_attendee=localStorage.getItem('userName');
    this.Quiz_Service.getQuizDetails(this.quiz).subscribe(data => {

      // this.quiz = data;
      // console.log(data);
      
      this.res = data;
      this.quiz = this.res.payload.response;
      // console.log(this.quiz);
    },
      err => {
        this.res = err;
        console.log(err);
      });
    this.Reslut_Service.getResultDetails(this.result).subscribe(data => {

      // this.quiz = data;
      // console.log(data);
      
      this.res2 = data;
      this.result = this.res2.payload.result.pop();
      // console.log(this.result);
    },
      err => {
        this.res = err;
        console.log(err);
      });
  }

  customQTrackBy(index: number, item: any): any {
    return index;
  }

  customATrackBy(index: number, item: any): any {
    return index;
  }

  addSubmit_Ans(qIndex,qes,aIndex,ans ){
    const newans = {
    questionContent: qes.question.questionContent,
    questionOrder: qes.question.questionOrder,
    submittedAns: ans.answerContent,
    correct: qes.quizAns.match(ans.answerContent) ? true :false,
    }
    this.submit_quiz.question.splice(qIndex,1,newans);
    // console.log(this.submit_quiz);
  }

  submitQuiz(){
    // console.log(this.result.pending_quiz_id.includes(this.submit_quiz.quiz_id));
    this.spinner.show();
    if(this.result.pending_quiz_id.includes(this.submit_quiz.quiz_id)){
      let tmp_idx=this.result.pending_quiz_id.indexOf(this.submit_quiz.quiz_id);
      this.result.pending_quiz_id.splice(tmp_idx,1);
      this.result.attempted_quiz.push(this.submit_quiz);
      console.log(this.result);

      this.Reslut_Service.submitQuiz(this.result).subscribe(data => {
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
    
    // this.result.attempted_quiz.push(this.submit_quiz);
    this.router.navigate(['../result'],{ relativeTo: this.route });
  }

}

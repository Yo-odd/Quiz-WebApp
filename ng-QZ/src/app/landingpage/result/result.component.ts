import { Component, OnInit } from '@angular/core';
import { QuestionAnswersDto, QuestionDto, AnswerDto, Quiz, QuizSubmission, ResultSchema, User } from 'data_skeleton/datamodel';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuizService } from 'src/app/quiz.service';
import { ResultService } from 'src/app/result.service';
import { AuthService } from 'src/app/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private Reslut_Service: ResultService, private Quiz_Service: QuizService, private User_Service: AuthService, public router: Router, private spinner: NgxSpinnerService, public route: ActivatedRoute) { }

  // uList: QuestionAnswersDto[];
  p_qid = [];
  // uList: User[] = [];

  searchText = '';
  isHidden: boolean[] = [false];

  // result: ResultSchema[] = [];

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

  retrive_quiz: Quiz[] = [{
    _id: undefined,
    quizTitle: '',
    creator: undefined,
    quizExp: '',
    quizTime: '',
    quizData: []
  }];

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
  // quizTitleArray = [];
  // userArray = [];
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

  ngOnInit(): void {
    this.user.userName = this.route.snapshot.paramMap.get('userName');
    this.fetchQuizMetaData();
  }

  fetchQuizMetaData() {
    this.quizInsights.length = 0;
    // -----------Fetch the quiz created by loged-in User
    this.Reslut_Service.getUserQuizzes(this.result).subscribe(data => {

      this.res = data;
      // console.log(this.res);
      
      this.res.payload[0].attempted_quiz.forEach(element => {
        // console.log(element);
        let total=element.question.length;
        let false_ans=0;
        element.question.forEach(qes => {
          // console.log(qes.correct);
          if (qes.correct==false) {
            false_ans=false_ans+1;
          }
        });
        // console.log(false_ans);
        
        this.quiz._id = element.quiz_id;
        // this.creator._id = element.creator;
        this.Quiz_Service.getQuizTitle(this.quiz).subscribe(quiz_data => {
          // console.log(quiz_data);
        // this.creator._id = quiz_data[0].creator;
        this.User_Service.getUserBasicDetails(quiz_data[0].creator).subscribe(creator_data => {
          const tmp_q_HL = {
              quiz_attendee: this.res.payload[0].quiz_attendee,
              role: this.res.payload[0].role,
              creator: creator_data[0].userName,
              attempted_quiz: element.quiz_id,
              total:total,
              marks:total-false_ans,
              // attempted_quiz_data: element.question,
              quizTitle: quiz_data[0].quizTitle,
              quizExp: moment(element.quizExp).calendar('dd, MMM Do'),
              quiz_attended_Time: moment(element.attemptDate).format('dd, MMM Do, h:mm'),
              updatedAt: moment(this.res.payload[0].updatedAt).local().format('DD-MM-YYYY,h:mm:ss'),
              // updatedAt: this.res.payload[0].updatedAt,
            };
          // console.log(tmp_q_HL);
          this.quizInsights.push(tmp_q_HL);
          // this.quizInsights.length;
        });
        });
      });
      // console.log(this.quizInsights);
    },
      err => {
        this.res = err;
        console.log(err);
      });
  }


  view_Quiz_result(qIndex){
    // localStorage.setItem('quiz_id', this.quizInsights[qIndex].pending_quiz_id);
    // this.router.navigate(['../attemptQuiz'], { relativeTo: this.route });
  }
  
  customQTrackBy(index: number, item: any): any {
    return index;
  }


}

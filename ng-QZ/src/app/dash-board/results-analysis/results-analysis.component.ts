import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { User, Quiz, QuizContent, QuestionDto, QuestionAnswersDto, AnswerDto, ResultSchema } from 'data_skeleton/datamodel';
import { ResultService } from 'src/app/result.service';
import { QuizService } from 'src/app/quiz.service';
import * as moment from 'moment';
import { UserResultPipe } from 'src/app/user-result.pipe';
// import { QuizComponent } from '../../quiz/quiz.component';


@Component({
  selector: 'app-results-analysis',
  templateUrl: './results-analysis.component.html',
  styleUrls: ['./results-analysis.component.scss'],
  providers: [UserResultPipe],
})
export class ResultsAnalysisComponent implements OnInit {
  // res2: Quiz;

  constructor(private Reslut_Service: ResultService, private Quiz_Service: QuizService, private User_Service: AuthService, public router: Router, private spinner: NgxSpinnerService, public route: ActivatedRoute, private userResult_pipe: UserResultPipe) { }

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
    // this.userResult_pipe.transform(this.quizInsights,'');
  }

  fetchQuizMetaData() {
    this.quizInsights.length = 0;
    // -----------Fetch the quiz created by loged-in User
    this.Reslut_Service.getLeadQuizzes(this.result).subscribe(data => {

      this.res = data;
      // console.log(this.res);
      if (this.res.payload[0].role == 'lead' || 'admin' == localStorage.getItem('role')) {
        this.res.payload.spectate.forEach(attendee => {
          console.log(attendee);
          if (attendee.attempted_quiz.length > 0) {
            attendee.attempted_quiz.forEach(element => {
              // console.log(element);
              
              let total = element.question.length;
              let false_ans = 0;
              element.question.forEach(qes => {
                if (qes.correct == false) {
                  false_ans = false_ans + 1;
                }
              });

              this.quiz._id = element.quiz_id;
              this.Quiz_Service.getQuizTitle(this.quiz).subscribe(quiz_data => {
                this.User_Service.getUserBasicDetails(quiz_data[0].creator).subscribe(creator_data => {
                  const tmp_q_HL = {
                    quiz_attendee: attendee.quiz_attendee,
                    role: attendee.role,
                    creator: creator_data[0].userName,
                    attempted_quiz: element.quiz_id,
                    total: total,
                    marks: total - false_ans,
                    quizTitle: quiz_data[0].quizTitle,
                    quizExp: moment(element.quizExp).calendar('dd, MMM Do'),
                    quiz_attended_Time: moment(element.attemptDate).format('dd, MMM Do, h:mm'),
                    updatedAt: moment(attendee.updatedAt).local().format('DD-MM-YYYY,h:mm:ss'),
                  };
                  this.quizInsights.push(tmp_q_HL);
                });
              });
            });

          }

        });
      }
      // console.log(this.quizInsights);
      
    },
      err => {
        this.res = err;
        console.log(err);
      });
  }


  attempt_Quiz(qIndex) {
    // localStorage.setItem('quiz_id', this.quizInsights[qIndex].pending_quiz_id);
    // this.router.navigate(['../attemptQuiz'], { relativeTo: this.route });
  }

  customQTrackBy(index: number, item: any): any {
    return index;
  }

}


import { Component, OnInit } from '@angular/core';
import { User, ResultSchema, Quiz } from 'data_skeleton/datamodel';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
import { ResultService } from 'src/app/result.service';
import { QuizService } from 'src/app/quiz.service';
import * as moment from 'moment';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

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

      this.res.payload.pl_Title.forEach(element => {
        
        this.creator._id = element.creator;
        this.User_Service.getUserBasicDetails(element.creator).subscribe(data => {
          this.res2 = data[0].userName;
          console.log(this.res2);
          const tmp_q_HL = {
            quiz_attendee: this.res.payload[0].quiz_attendee,
            role: this.res.payload[0].role,
            creator: this.res2,
            pending_quiz_id: element._id,
            quizTitle: element.quizTitle,
            quizExp: moment(element.quizExp).calendar("dd, MMM Do"),
            quizTime:element.quizTime,
            updatedAt: moment(this.res.payload[0].updatedAt).local().format('DD-MM-YYYY'),
            // updatedAt: this.res.payload[0].updatedAt,
          };
          console.log(tmp_q_HL);
          this.quizInsights.push(tmp_q_HL);
        });
      });
      console.log(this.quizInsights);
    },
      err => {
        this.res = err;
        console.log(err);
      });
  }

  attempt_Quiz(qIndex){
    localStorage.setItem('quiz_id',this.quizInsights[qIndex].pending_quiz_id);
    this.router.navigate(['../attemptQuiz'],{ relativeTo: this.route });
  }
  
  customQTrackBy(index: number, item: any): any {
    return index;
  }
}

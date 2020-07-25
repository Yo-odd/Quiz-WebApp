import { Component, OnInit } from '@angular/core';
import { Quiz, User, ResultSchema } from 'data_skeleton/datamodel';
import { QuizService } from 'src/app/quiz.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { element } from 'protractor';
import { ResultService } from 'src/app/result.service';
import * as moment from 'moment';

@Component({
  selector: 'app-organize-quiz',
  templateUrl: './organize-quiz.component.html',
  styleUrls: ['./organize-quiz.component.scss']
})
export class OrganizeQuizComponent implements OnInit {

  // uList: QuestionAnswersDto[];
  p_qid = [];
  // uList: User[] = [];

  searchText = '';
  isHidden: boolean[] = [false];

  result: ResultSchema[] = [];

  // result: ResultSchema = {
  //   user_id: '',
  //   role: '',
  //   pending_quiz_id: [],
  // };

  quiz: Quiz = {
    _id: undefined,
    quizTitle: '',
    creator: undefined,
    quizExp: '',
    quizTime: '',
    quizData: []
  };

  retrive_quiz: Quiz = {
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
  // quizInsights= [];
  quizInsights = [{
    quiz_attendee: '',
    role: '',
    pending_quiz_id: [],
    quizTitle: [] = [],
    updatedAt: ''
  }];
  index: number;
  quizTitleArray = [];
  userArray = [];
  selected_title_id: any;
  selected_title: any;

  constructor(private Reslut_Service: ResultService, private Quiz_Service: QuizService, private User_Service: AuthService, public router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    // init data
    // this.uList = [
    // ];
    //-----------Fetch the quiz created by loged-in Admin
    this.Quiz_Service.getQuizzes().subscribe(data => {

      // console.log(data);
      this.res = data;
      this.res.payload.result.forEach(element => {
        this.quizTitleArray.push(element);
      });

      // console.log('quizTitleArray:', this.quizTitleArray);
    },
      err => {
        this.res = err;
        console.log(err);
      });

    // --------------------Fetch all users --------------------------

    this.User_Service.getAllUser().subscribe(data => {
      // console.log(data);
      this.res = data;
      this.res.forEach(element => {
        this.userArray.push(element);
      });

      // console.log('userArray:', this.userArray);
    },
      err => {
        this.res = err;
        console.log(err);
      });
  }

  // -------------------------------------------------------------------------------------end of ngOnInit

  fetchQuizMetaData() {
    this.quizInsights.length = 0;
    this.Reslut_Service.getResults().subscribe(data => {
      console.log(data);
      this.res2 = data;

      this.res2.payload.result.forEach(element => {
        element.updatedAt = moment(element.updatedAt).local().format('DD-MM-YYYY');
        let idx = 0;
        let tmparray = [];
        element.pending_quiz_id.forEach(plist_id => {
          // console.log(plist_id);

          this.retrive_quiz._id = plist_id;
          this.Quiz_Service.getQuizTitle(this.retrive_quiz).subscribe(data => {
            let tmp = data;
            // console.log(tmp[0]['quizTitle']);
            tmparray.push(tmp[0]['quizTitle']);
          },
            err => {
              this.res2 = err;
              console.log(err);
            });

        });
        element.quizTitle = tmparray;
        this.quizInsights.push(element);
      });

      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    },
      err => {
        this.res2 = err;
        console.log(err);
      });
  }

  addQuestionByIndex(uIndex, ...user) {
    const newU = {
      quiz_attendee: user[0]['userName'],
      user_id: user[0]['_id'],
      pending_quiz_id: [] = this.p_qid,
      role: 'user',
    };
    this.result.splice(uIndex, 0, newU);
    this.isHidden[uIndex - 1] = true;
  }
  addQuestionByIndex_lead(uIndex, ...user) {
    const newU = {
      quiz_attendee: user[0]['userName'],
      user_id: user[0]['_id'],
      pending_quiz_id: [] = this.p_qid,
      role: 'lead',
    };
    this.isHidden[uIndex - 1] = true;
    this.result.splice(uIndex, 0, newU);
  }

  removeQuestionByIndex(uIndex, ...user) {
    if (uIndex > -1) {
      console.log(user[0]['_id']);
      for (let index = 0; index < this.result.length; index++) {
        if (this.result[index].user_id.match(user[0]['_id'])) {
          let tmp = index;
          console.log(tmp);
          this.result.splice(tmp, 1);
        }
      }
      this.isHidden[uIndex] = false;
    }
  }

  organizeQuiz() {
    this.quiz.quizTitle = this.selected_title.quizTitle;
    this.p_qid.push(this.selected_title._id);
  }
  revokeQuiz() {
    this.quiz.quizTitle = this.selected_title.quizTitle;
    if (this.p_qid.includes(this.selected_title._id)) {
      this.p_qid.splice(this.p_qid.indexOf(this.selected_title._id), 1);
      for (const key in this.res) {
        if (this.res.hasOwnProperty(key) && key == 'pending_quiz_id') {
          this.res[key] = this.p_qid;
        }
      }
    }
  }


  customQTrackBy(index: number, item: any): any {
    return index;
  }

  customUTrackBy(index: number, item: any): any {
    return index;
  }

  customATrackBy(index: number, item: any): any {
    return index;
  }
  customQZTrackBy(index: number, item: any): any {
    return index;
  }


  // ------------------------------------------ send data to server

  async sendQuiz(createQuizForm: NgForm) {
    event.preventDefault();

    this.result.forEach(element => {
      this.Reslut_Service.organizeQuiz(element).subscribe(data => {
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
    });
    // this.fetchQuizMetaData();
    // this.res = this.quiz.quizData;
    this.res = this.result;

  }

}

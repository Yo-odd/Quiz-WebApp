import { Component, OnInit } from '@angular/core';
import { User } from 'data_skeleton/datamodel';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  res: any;
  dashb: boolean;
  user: User = {
    _id: undefined,
    email: '',
    userName: localStorage.getItem('userName'),
    password: '',
    role:'',
    repassword:''
  };
  constructor(private Auth: AuthService, private http: HttpClient, public router: Router,private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('role')=='admin') {
      this.dashb = true;
    }
  }

  signout(){
    // event.preventDefault();
    this.spinner.show();
    if (this.Auth.signout_service()) {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 500);
      this.router.navigate(['login']);
    }
  }

}

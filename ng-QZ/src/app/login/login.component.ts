import { Component, OnInit } from '@angular/core';
import { User } from 'data_skeleton/datamodel';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations:['NgxSpinnerService']
})
export class LoginComponent implements OnInit {
  // userName: String;
  // password: String;
  constructor(private Auth: AuthService, private http: HttpClient, public router: Router,private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  // url = '/quiz';
  res: any;
  user: User = {
    _id: undefined,
    email: '',
    userName: '',
    password: '',
    role:'',
    repassword:''
  };

  ngOnInit(): void {
    this.user.userName = this.route.snapshot.paramMap.get('userName');
    // localStorage.clear();
  }

  async loginUser(signupForm: NgForm) {
    event.preventDefault();
    // this.user=signupForm.value;
    /** spinner starts on init */
    this.spinner.show();
    this.Auth.verifyUserDetails(signupForm.value).subscribe(data => {
      // alert('server response: ' + data);
      console.log(data);
      this.res = data;
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 500);
      if (this.res.status == 200) {
        localStorage.setItem('token',this.res.payload.token);
        localStorage.setItem('userName',this.res.payload.userName);
        localStorage.setItem('role',this.res.payload.role);
        localStorage.setItem('_id',this.res.payload._id);
        if (this.res.payload.role == 'admin') {
          // console.log('from login: ',this.res.payload.role);
          
          this.router.navigate(['../dashboard'],{ relativeTo: this.route });
        }
        if (this.res.payload.role == 'lead')
        {
          this.router.navigate(['../landingpage/leadBoard'],{ relativeTo: this.route });
        }
        if (this.res.payload.role =='user')
        {
          this.router.navigate(['../landingpage/quiz'],{ relativeTo: this.route });
        }
        if (!this.res.payload.role)
        {
          this.router.navigate(['../landingpage'],{ relativeTo: this.route });
        }
      }
    },
      err => {
        this.res = err;
        console.log(err);
      });
    // JSON.parse(this.res);
    // console.log(this.res);
    // console.log(this.form);
  }

}

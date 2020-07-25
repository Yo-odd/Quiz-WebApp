import { Component, OnInit } from '@angular/core';
import { User } from 'data_skeleton/datamodel';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  dashb: boolean;
  leadb: boolean;
  no_role: boolean;
  searchText = '';
  res: any;
  user: User = {
    _id: undefined,
    email: '',
    userName: localStorage.getItem('userName'),
    password: '',
    role:localStorage.getItem('role'),
    repassword:''
  };
  userArray: any[]=[];
  constructor(private Auth: AuthService, private http: HttpClient, public router: Router,private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.user.userName=localStorage.getItem('userName');

    if (localStorage.getItem('role')=='admin') {
      this.dashb = true;
    }
    if (localStorage.getItem('role')=='lead') {
      this.leadb = true;
    }
    if (localStorage.getItem('role')=='undefined') {
      this.no_role = true;
      console.log(this.no_role);
      // $('#myModal').modal('show');
    }
    // console.log(this.no_role);

    // --------------------Fetch all users --------------------------

    this.Auth.getAllAdmin(this.user.role).subscribe(data => {
      this.res = data;
      console.log(this.res);
      
      this.res.forEach(element => {
        this.userArray.push(element);
      });
    },
      err => {
        this.res = err;
        console.log(err);
      });
  }

  customUTrackBy(index: number, item: any): any {
    return index;
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

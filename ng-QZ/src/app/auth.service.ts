import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import { User } from 'data_skeleton/datamodel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  verifyUserDetails(user: User) {
    // post to rest api and get data
    const login = environment.apiBaseUrl + '/login';
    return this.http.post(login, user);
  }

  verify_token() {
    // post to rest api and get data
    const payload={
      verify:true,
      token:this.getToken(),
    }
    console.log(payload);
    const verify_token_url = environment.apiBaseUrl + '/verify_token';
    return this.http.post(verify_token_url, payload);
  }
  
  getUserDetails(user: User) {
    // post to rest api and get data
    const mydetails = environment.apiBaseUrl + '/mydetails';
    return this.http.post(mydetails, user.userName);
    console.log(user);
  }
  getUserBasicDetails(_id: string) {
    // post to rest api and get data
    const mydetails = environment.apiBaseUrl + '/getUserBasicDetails';
    return this.http.post(mydetails, {'_id':_id});
  }
  getAllUser() {
    // post to rest api and get data
    const mydetails = environment.apiBaseUrl + '/allUser';
    return this.http.get(mydetails);
  }
  getAllAdmin(role: string) {
    // post to rest api and get data
    const mydetails = environment.apiBaseUrl + '/allAdmin';
    return this.http.post(mydetails, {'role':role});
  }
  registerUser(user: User) {
    // post to rest api and get data
    const login = environment.apiBaseUrl + '/addUser';
    return this.http.post(login, user);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUserRole(){
    return localStorage.getItem('role');
  }
  signout_service(){
    localStorage.clear();
    return true;
  }
}

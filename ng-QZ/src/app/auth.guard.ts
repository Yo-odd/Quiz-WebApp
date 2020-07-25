import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private Auth: AuthService, public router: Router, private route: ActivatedRoute){}

  role =this.Auth.getUserRole();
  canActivate(): boolean{
    if ( this.role == 'admin') {
      // console.log('from auth guard: ',this.role);
      return true;
    }
    if ( this.role == 'undefined')
    {
      this.router.navigate(['landingpage'],{ relativeTo: this.route });
    }
    return false;
  }
}


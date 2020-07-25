import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-QZ';
  CURRENT_YEAR: number = new Date().getFullYear();
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from '../app/landingpage/quiz/quiz.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from '../app/landingpage//result/result.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { TokenInterceptorService } from './token-interceptor.service';
import { from } from 'rxjs';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from './auth.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CreateQuizComponent } from './dash-board/create-quiz/create-quiz.component';
import { ResultsAnalysisComponent } from './dash-board/results-analysis/results-analysis.component';
import { QuizService } from './quiz.service';
import { EditQuizComponent } from './dash-board/edit-quiz/edit-quiz.component';
import { ResultService } from './result.service';
import { OrganizeQuizComponent } from './dash-board/organize-quiz/organize-quiz.component';
import { FilterPipe } from './filter.pipe';
import { AttendQuizComponent } from './landingpage/attend-quiz/attend-quiz.component';
import { UserResultPipe } from './user-result.pipe';
import { LeadBoardComponent } from './landingpage/lead-board/lead-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuizComponent,
    RegisterComponent,
    ResultComponent,
    PagenotfoundComponent,
    DashBoardComponent,
    LandingpageComponent,
    CreateQuizComponent,
    ResultsAnalysisComponent,
    EditQuizComponent,
    OrganizeQuizComponent,
    FilterPipe,
    AttendQuizComponent,
    UserResultPipe,
    LeadBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, QuizService, ResultService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

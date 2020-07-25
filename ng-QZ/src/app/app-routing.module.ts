import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from '../app/landingpage/quiz/quiz.component';
import { ResultComponent } from '../app/landingpage/result/result.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthGuard } from './auth.guard';
import { CreateQuizComponent } from './dash-board/create-quiz/create-quiz.component';
import { ResultsAnalysisComponent } from './dash-board/results-analysis/results-analysis.component';
import { EditQuizComponent } from './dash-board/edit-quiz/edit-quiz.component';
import { OrganizeQuizComponent } from './dash-board/organize-quiz/organize-quiz.component';
import { AttendQuizComponent } from './landingpage/attend-quiz/attend-quiz.component';
import { LeadBoardComponent } from './landingpage/lead-board/lead-board.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'CreateQuiz', component: CreateQuizComponent },
      { path: 'ResultsAnalysis', component: ResultsAnalysisComponent },
      { path: 'EditQuiz', component: EditQuizComponent },
      { path: 'OrganizeQuiz', component: OrganizeQuizComponent }
    ]
  },
  {
    path: 'landingpage', component: LandingpageComponent,
    children: [
      { path: 'quiz', component: QuizComponent },
      { path: 'result', component: ResultComponent },
      { path: 'attemptQuiz', component: AttendQuizComponent },
      { path: 'leadBoard', component: LeadBoardComponent},
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

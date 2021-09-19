import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { AdminGuard } from './services/guards/admin.guard';
import { GuestGuard } from './services/guards/guest.guard';
import { LeaveQuizGuardService } from './services/leave-quiz-guard.service';
import { QuizResolverService } from './services/quiz-resolver.service';
import { AddQuestionComponent } from './views/admin/add-question/add-question.component';
import { AddQuizComponent } from './views/admin/add-quiz/add-quiz.component';
import { AddSubjectComponent } from './views/admin/add-subject/add-subject.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { DisplayQuizComponent } from './views/user/display-quiz/display-quiz.component';
import { LiveQuizComponent } from './views/user/live-quiz/live-quiz.component';
import { QuizLandingComponent } from './views/user/quiz-landing/quiz-landing.component';
import { UserDashboardComponent } from './views/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch:"full"},
  {path:"signup", component:SignupComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'user-dashboard',component:UserDashboardComponent,canActivate:[GuestGuard],children:[
    {path:'profile',component:ProfileComponent},
    {path:"quiz/:subCode",component:DisplayQuizComponent}
  ]},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[AdminGuard],children:[
    {path:'profile',component:ProfileComponent},
    {path:'',component:HomeComponent},
    {path:"subject-list",component:SubjectListComponent},
    {path:"add-subject",component:AddSubjectComponent},
    {path:"quiz-list",component:QuizListComponent},
    {path:"add-quiz",component:AddQuizComponent},
    {path:"question-list/:quizId",component:QuestionListComponent},
    {path:"add-question/:quizId",component:AddQuestionComponent}
  ]},
  {path:"landing-quiz/:qid",component:QuizLandingComponent,pathMatch:'full',canActivate:[GuestGuard],resolve:{'quiz':QuizResolverService}},
  {path:"live-quiz/:qid",component:LiveQuizComponent,pathMatch:'full',canActivate:[GuestGuard],resolve:{'quiz':QuizResolverService},canDeactivate:[LeaveQuizGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './views/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AuthInterceptorProvider, AuthInterceptorService } from './services/auth.interceptor';
import { UserDashboardComponent } from './views/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import {MatListModule} from '@angular/material/list';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './views/admin/sidebar/sidebar.component';
import {MatTableModule} from '@angular/material/table';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { AddSubjectComponent } from './views/admin/add-subject/add-subject.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { AddQuizComponent } from './views/admin/add-quiz/add-quiz.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { AddQuestionComponent } from './views/admin/add-question/add-question.component';
import { UserSidebarComponent } from './views/user/user-sidebar/user-sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    SubjectListComponent,
    AddSubjectComponent,
    QuizListComponent,
    AddQuizComponent,
    QuestionListComponent,
    AddQuestionComponent,
    UserSidebarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  providers: [AuthInterceptorProvider,UserService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

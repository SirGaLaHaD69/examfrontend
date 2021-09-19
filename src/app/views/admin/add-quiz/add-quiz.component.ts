import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  subjects:any = [
    {subjectName:"AI"},
    {subjectName:"ML"}
  ]
  quiz:any={
    title:"",
    description:"",
    maxMarks:null,
    noOfQuestions:null,
    active:true,
    subject:{
      subjectCode:null
    }
  }
  constructor(private subjectService:SubjectService,
    private login:LoginService,
    private router:Router,
    private quizService:QuizService) { 
      if(history.state.data)
      this.quiz=history.state.data;
    }
  clearAll(){
    this.quiz={
      title:"",
      description:"",
      maxMarks:null,
      noOfQuestions:null,
      active:true,
      subject:{
        subjectCode:null
      }
    }
  }
  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((data)=>{
      this.subjects=data;
    },(err)=>{
      Swal.fire({title:"Something went wrong,Please Login again",icon:'error'});
    })
  }
  submitHandler(){
    this.quizService.addQuiz(this.quiz).subscribe((msg)=>{
      Swal.fire({title:"Quiz Added Successfully",icon:'success'})
      this.router.navigate(['/admin-dashboard/quiz-list']);
    },
    (err)=>{
      Swal.fire({title:"Something went wrong!\nPlease Login again",icon:'error'});
      console.log(err);
      
      this.login.logout();
      this.router.navigate(['/login']);
    })
  }

}

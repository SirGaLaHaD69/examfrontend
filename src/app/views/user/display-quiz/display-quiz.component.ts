import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {

  quizzes=[]
  quizzesOfSub=[]
  subCode:any;
  constructor(private route:ActivatedRoute,
    private quizService:QuizService,
    private login:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    
    this.quizService.getAllQuizzes().subscribe((data:any)=>{
      this.quizzes=data;
      this.route.params.subscribe(params=>{
        this.subCode=params.subCode;
        if(this.subCode!=0){
          this.filterQuiz();
        }
        else{
          this.quizzesOfSub=[...this.quizzes]          
        }

      })
    },(err)=>{
      Swal.fire({title:"Something went wrong!\nPlease Login again",icon:'error'});
      console.log(err);
      this.login.logout();
      this.router.navigate(['/login']);
    })
  }
  filterQuiz(){
    this.quizzesOfSub=this.quizzes.filter((q:any)=>q.subject.subjectCode==this.subCode)
  }

}

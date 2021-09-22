import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-landing',
  templateUrl: './quiz-landing.component.html',
  styleUrls: ['./quiz-landing.component.css']
})
export class QuizLandingComponent implements OnInit {

  quiz: any;
  hasAppeared:boolean=false;
  user:any
  marksScored:any
  totalMarks:any
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private nav:NavbarService,
    private quizServ:QuizService,
    private login:LoginService
  ) { }

  ngOnInit(): void {
    this.nav.show();
    this.user=this.login.getUser();
    this.quiz=this.route.snapshot.data['quiz'];

    this.quizServ.getResult(this.user.id,this.quiz.id).subscribe((data:any)=>{
      if(data.text!=null){
        this.hasAppeared=false;
      }
      else{
        this.hasAppeared=true;
        this.marksScored=data.marksScored;
        this.totalMarks=data.totalMarks
      }
    })

  }
  
  startQuiz(){
    Swal.fire({
      title: 'Do you want to start??',
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
      icon:'info'
    }).then((result) => {
      if (result.isConfirmed) {
          this.router.navigate(['/live-quiz',this.quiz.id])
        }
      })
    
  }
  

}

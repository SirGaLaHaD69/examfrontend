import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-landing',
  templateUrl: './quiz-landing.component.html',
  styleUrls: ['./quiz-landing.component.css']
})
export class QuizLandingComponent implements OnInit {

  quiz: any;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private nav:NavbarService
  ) { }

  ngOnInit(): void {
    this.nav.show();
    this.quiz=this.route.snapshot.data['quiz'];
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

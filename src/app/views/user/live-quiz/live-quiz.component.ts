import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-live-quiz',
  templateUrl: './live-quiz.component.html',
  styleUrls: ['./live-quiz.component.css']
})
export class LiveQuizComponent implements OnInit {

  quiz:any
  questions=[]
  constructor(
    private route:ActivatedRoute,
    private locationStrategy:LocationStrategy,   
    private questionServ:QuestionService,
    private login:LoginService,
    private router:Router,
    private nav:NavbarService
    ) { }

  ngOnInit(): void {
    this.fullScreen();
    this.nav.hide();
    this.quiz=this.route.snapshot.data.quiz;
    this.questionServ.getQuestionByQuizId(this.quiz.id).subscribe((data:any)=>{
      this.questions=data;
    },
    (err)=>{
      Swal.fire({title:"Something went wrong!\nPlease Login again",icon:'error'});
      console.log(err);
      
      this.login.logout();
      this.router.navigate(['/login']);
    })
  }
  wannaQuit():Promise<boolean>{
    return Swal.fire({
      title: 'Navigate Away?\n Your responses will be lost.',
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.nav.show();
        return true;
        }
      else{
        return false;
      }
    })
  }
  fullScreen() {
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen
      
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
}


}

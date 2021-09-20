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
  user:any;
  questions=[]
  nosAttempted:number=0;
  marksScored:number=0;
  nosCorrect:number=0;
  hasSubmitted:boolean=false;
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
    this.user=this.login.getUser();
    this.questionServ.getQuestionByQuizId(this.quiz.id).subscribe((data:any)=>{
      this.questions=data;
      this.questions.forEach((q:any)=>{
        q['userAns']='';
      })
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
      icon:'warning'
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

  calMarks(){
    this.questions.forEach((q:any)=>{
      const mark=+(this.quiz.maxMarks/this.quiz.noOfQuestions);
      if(q.userAns!==''){
        this.nosAttempted++;
        if(q.userAns==q.ans){
          this.nosCorrect++
          this.marksScored+=mark;
        }
      }
    })
  }
  submitHandler(){
    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
      icon:'info'
    }).then((result) => {
      if (result.isConfirmed) {
          this.hasSubmitted=true;
          this.calMarks();
        }
      })
  }
  endQuiz(){
    this.nav.show();
    this.router.navigate(['/user-dashboard/profile']);
  }


}

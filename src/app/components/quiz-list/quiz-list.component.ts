import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizzes:any =[]
  constructor(private quizService:QuizService,
  private login:LoginService,
  private router:Router)  { }
  
  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((data)=>{
      this.quizzes=data;
    },(err)=>{
      Swal.fire({title:"Something went wrong,Please Login again",icon:'error'});
        console.log(err);
        
        this.login.logout();
        this.router.navigate(['/login']);
    })
  }
  deleteHandler(id:any){
    Swal.fire({
      title: 'Do you want to delete this quiz?',
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(id).subscribe((succ)=>{
          this.quizzes=this.quizzes.filter((quiz:any)=>quiz.id!=id);
          Swal.fire('Quiz Deleted!', '', 'success');
        },
        (err)=>{
          if(err.status!==200){
          Swal.fire({title:"Something went wrong",icon:'error'});
          console.log(err);
          }
          this.quizzes=this.quizzes.filter((quiz:any)=>quiz.id!=id);
          Swal.fire('Quiz Deleted!', '', 'success');
        })
      }
    })
  }
  updateQuiz(quiz:any){
    
    this.router.navigate(['/admin-dashboard/add-quiz'],{state:{data:quiz}});
  }

}

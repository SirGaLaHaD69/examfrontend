import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions:any= []
  quizTitle :any;
  qid:any;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private questionService:QuestionService) { 
      if(localStorage!==undefined){
        if(history.state.title)
        localStorage.setItem('quizTitle',history.state.title);
      }
    }

  ngOnInit(): void {
    this.qid= this.route.snapshot.params.quizId
    this.quizTitle=localStorage.getItem('quizTitle')
    this.questionService.getQuestionByQuizId(this.qid).subscribe(data=>{
      this.questions=data
    })
  }
  deleteHandler(id:any){
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(id).subscribe((succ)=>{
          this.questions=this.questions.filter((q:any)=>q.id!=id);
          Swal.fire('Question Deleted!', '', 'success');
        },
        (err)=>{
          if(err.status!==200){
          Swal.fire({title:"Something went wrong",icon:'error'});
          console.log(err);
          }
          this.questions=this.questions.filter((quiz:any)=>quiz.id!=id);
          Swal.fire('Question Deleted!', '', 'success');
        })
      }
    })
  }
  updateHandler(q:any){
    this.router.navigate(['/admin-dashboard/add-question',this.qid],{state:{question:q}})
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  question:any={
    quiz:{},
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    ans:"",
    content:""
  };
  quizId:any;
  quizTitle:any;
  constructor(private route:ActivatedRoute,
    private questionService:QuestionService,
    private router:Router,
    private login:LoginService) { 
    if(history.state.question)
      this.question=history.state.question;
    this.quizId=this.route.snapshot.params.quizId;
    if(localStorage!==undefined){
      if(history.state.title)
        localStorage.setItem('title',history.state.title);
    }
    this.question.quiz['id']=this.quizId;
  }

  ngOnInit(): void {

    this.quizTitle=localStorage.getItem('title');
  }
  submitHandler(){
    this.questionService.addQuestion(this.question).subscribe((msg)=>{
      Swal.fire({title:"Question Added Successfully",icon:'success'})
      this.router.navigate([`/admin-dashboard/question-list/${this.quizId}`]);
    },
    (err)=>{
      Swal.fire({title:"Something went wrong!\nPlease Login again",icon:'error'});
      console.log(err);
      this.login.logout();
      this.router.navigate(['/login']);
    })
  }
}

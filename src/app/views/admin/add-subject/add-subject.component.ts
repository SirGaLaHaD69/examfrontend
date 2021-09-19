import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subject:any={}
  constructor(private subService:SubjectService,private login:LoginService,private router: Router) { }

  ngOnInit(): void {
    this.subject={
      subjectName:"",
      professor:"",
      description:""
    }
  }
  submitHandler(){
      this.subService.addSubject(this.subject).subscribe((msg)=>{
        Swal.fire({title:"Subject Added Successfully",icon:'success'})
      },
      (err)=>{
        Swal.fire({title:"Something went wrong,Please Login again",icon:'error'});
        console.log(err);
        
        this.login.logout();
        this.router.navigate(['/login']);
      })
  }

}

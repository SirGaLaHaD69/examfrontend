import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjects:any = [
    {subjectName:"AI"},
    {subjectName:"ML"}
  ]
  constructor(private subjectService:SubjectService,
    private login:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((data)=>{
      this.subjects=data;
    },(err)=>{
      Swal.fire({title:"Something went wrong,Please Login again",icon:'error'});
        this.login.logout();
        this.router.navigate(['/login']);
    })
  }

}

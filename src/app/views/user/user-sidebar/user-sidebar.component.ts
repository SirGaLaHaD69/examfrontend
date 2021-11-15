import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  subjects:any
  borderStyles:any ={ 'border': "solid 2px rgb(140, 203, 228)",'border-radius': "5px",'margin-top':"2px"};
  constructor(private subjectService:SubjectService,
    private login:LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe((data:any)=>{
      this.subjects=data;
    },(err)=>{
      Swal.fire({title:"Something went wrong!\nPlease Login again",icon:'error'});
      console.log(err);
      
      this.login.logout();
      this.router.navigate(['/login']);
    })
  }

}

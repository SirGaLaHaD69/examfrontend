import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any
  constructor(private loginService:LoginService,
    private snack:MatSnackBar,
    private route:Router
    ) { 
    this.user={
      username:"",
      password:""
    }
  }
  clearAll(){
    this.user={
      username:"",
      password:""
    }
  }
  ngOnInit(): void {
  }

  onSubmit(){
    this.loginService.genToken(this.user).subscribe(
      (success:any)=>{
        this.loginService.loginUser(success.token,this.user);
        this.loginService.getCurrentUser().subscribe((user)=>{
          this.loginService.loginUser(success.token,user);
          console.log(success);
          this.snack.open(`Welcome ${this.user.username}`,'',{duration:2000,verticalPosition:'top'})
          const role = this.loginService.getRoles();          
          if(role==='ADMIN'){
              this.route.navigate(['/admin-dashboard'])
          }else
          this.route.navigate(['/user-dashboard'])
        })
      },
      (err)=>{
        console.log(err);
        this.snack.open("Login Failed, Invalid Credentials",'',{duration:2000,verticalPosition:'top'})
      }
    )
  }

}

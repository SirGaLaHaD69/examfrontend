import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import {IUser} from "../../models/user.model";
import Swal from 'sweetalert2' 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : IUser;
  constructor(
    private userService: UserService,
    private snack:MatSnackBar
  ) { 
    this.user = {
      username : "",
      password:"",
      firstName:"",
      lastName:"",
      email:"",
      phone:""
    }
  }
  clearAll(){
    this.user = {
      username : "",
      password:"",
      firstName:"",
      lastName:"",
      email:"",
      phone:""
    }
  }
  ngOnInit(): void {
    this.clearAll();
  }

  onSubmit(){
      this.userService.addUser(this.user).subscribe(
        (data)=>{
            // this.snack.open("Registration Successfull",'ok',{
            //   duration:2000
            // });
            Swal.fire({title:"Registration Successful",icon:'success'})
        },
        (error)=>{
            // this.snack.open("Something went wrong",'cancel',{
            //   duration:3000
            // });
            console.log("hi");
            
            Swal.fire({title:"Something went wrong",icon:'error'});
        }
      )
      this.clearAll();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public login:LoginService,
    private router:Router,
    public nav:NavbarService) {

  }

  ngOnInit(): void {
  }
  logoutUser(){
    this.login.logout();
    this.router.navigate(["/"]);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //get currentUser
  public getCurrentUser(){
    return this.http.get(`${API}/current-user`);
  }

  //generate token
  public genToken(user:any){
      return this.http.post(`${API}/generate-token`,user);
  }
  //login user
  public loginUser(token:string,user:any){
    if(localStorage!==undefined){
      delete user["password"]
      localStorage.setItem(token,JSON.stringify(user));
      localStorage.setItem('token',token);
    }
  }
  //get token
  public getToken(){
    return localStorage.getItem('token');
  }
  //get user
  public getUser(){
      let token = this.getToken();
      if(token!=null)
        return JSON.parse(localStorage.getItem(token) || "{}");
      return null;
  }
  public getUsername(){
    let token = this.getToken();
    let username=null;
      if(token!=null)
        username= JSON.parse(localStorage.getItem(token) || "{}").username;
      return  username;
  }
  // is Loggedin
  public isLoggedIn(){
    return localStorage!==undefined && localStorage.getItem('token')!==null;
  }
  //logout
  public logout():boolean{
    if(this.isLoggedIn()){
      let token = this.getToken();
      if(token!=null){
        localStorage.removeItem('token')
        localStorage.removeItem(token);
      }
      return true;
    }
    return false;
  }
  // get roles
  public  getRoles(){
    const user =  this.getUser();
    if(user!=null)
      return user.authorities[0].authority;
    return null;
  }
}

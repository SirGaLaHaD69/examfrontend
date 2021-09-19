import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import API from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  // add users API
  public addUser(user:IUser){
    return this.http.post(`${API}/user/`,user);
  }
  // public getUser(username:string){
  //   return this.http.get(`${API}/user/${username}`).subscribe((user)=>{
  //     console.table(user);
  //   })
  // }
}

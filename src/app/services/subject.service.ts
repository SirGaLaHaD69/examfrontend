import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from './helper';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private _http :HttpClient) { }

  // get all subjects
  public getAllSubjects(){
    return this._http.get(`${API}/subject/`);
  }
  public addSubject(subject:any){
    return this._http.post(`${API}/subject/`,subject);
  }
}

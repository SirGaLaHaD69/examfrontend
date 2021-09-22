import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public getAllQuizzes(){
    return this._http.get(`${API}/quiz/`)
  }
  public addQuiz(quiz:any){
    return this._http.post(`${API}/quiz/`,quiz)
  }
  public deleteQuiz(id:any){
    return this._http.delete(`${API}/quiz/${id}`)
  }
  public getQuiz(id:any){
    return this._http.get(`${API}/quiz/${id}`)
  }
  public submitResponse(userId:any,quizId:any,marksScored:any,totalMarks:any){
    return this._http.post(`${API}/score/${userId}/${quizId}?score=${marksScored}&marks=${totalMarks}`,{});
  }
  public getResult(userId:any,quizId:any){
    return this._http.get(`${API}/score/${userId}/${quizId}`);

  }
}

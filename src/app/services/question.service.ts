import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  getQuestionByQuizId(id:any){
    return this.http.get(`${API}/question/quiz/${id}`);
  }
  addQuestion(question:any){
    return this.http.post(`${API}/question/`,question);
  }
  deleteQuestion(id:any){
    return this.http.delete(`${API}/question/${id}`);
  }
  evaluateQuiz(questions:any){
    return this.http.post(`${API}/question/eval`,questions);
  }
  
}

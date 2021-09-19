import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class QuizResolverService implements Resolve<any>{

  constructor(private quizService:QuizService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.quizService.getQuiz(route.params.qid);
  }
}

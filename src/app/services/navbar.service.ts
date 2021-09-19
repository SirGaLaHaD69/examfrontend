import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible:boolean=true
  constructor() { }
  show(){
    this.visible=true;
  }
  hide(){
    this.visible=false;
  }
}

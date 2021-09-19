import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  borderStyles:any ={ 'border': "solid 2px rgb(140, 203, 228)",'border-radius': "5px",'margin-top':"2px"};
  constructor() { }

  ngOnInit(): void {
  }

}

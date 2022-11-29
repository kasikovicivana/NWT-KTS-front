import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  active:string = 'route_2';

  constructor() { }

  ngOnInit(): void {
  }

  selectRoute(route:string){
    this.active = route;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: ` <p>Home Page</p>
  `,
})
export class HomeComponent implements OnInit {
  //IsUserloggedin: boolean = false;
  constructor() { }

  ngOnInit() {
    //this.IsUserloggedin=true;
  }

}

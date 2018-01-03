import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <div class="wrapper">
    <header-nav></header-nav>
    <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class HomeLayoutComponent { }

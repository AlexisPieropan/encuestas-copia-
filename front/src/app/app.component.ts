import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activatedRoute.firstChild?.data.subscribe((data) => {
          this.showNavbar = data['showHeader'];
          this.showFooter = data['showFooter']; 
        });
      }
    });
  }

  showNavbar: boolean = true;
  showFooter: boolean = true;

  shouldShowNavbar() {
    return this.showNavbar;
  }

  shouldShowFooter() {
    return this.showFooter;
  }
}

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
        // La ruta ha cambiado, verifica si debes mostrar app-header y app-footer.
        this.activatedRoute.firstChild?.data.subscribe((data) => {
          this.showNavbar = data['showHeader']; // Accede con corchetes.
          this.showFooter = data['showFooter']; // Accede con corchetes.
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

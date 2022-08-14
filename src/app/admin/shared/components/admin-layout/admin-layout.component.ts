import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  public logout(event: MouseEvent) {
    event.preventDefault();

    this.router.navigate(['login'], { relativeTo: this.route });
  }
}


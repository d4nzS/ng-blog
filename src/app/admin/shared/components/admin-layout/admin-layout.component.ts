import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  public logout(event: MouseEvent) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['login'], { relativeTo: this.route });
  }
}


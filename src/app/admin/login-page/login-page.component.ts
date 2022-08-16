import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const user: User = this.form.value;

    this.authService.login(user).subscribe((response) => {
      this.form.reset();
      this.router.navigate(['/admin','dashboard'],);
    });
  }
}

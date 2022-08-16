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
  public submitted = false;

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
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

    this.submitted = true;

    const user: User = this.form.value;

    this.authService.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin','dashboard'],);
      this.submitted = false;
    }, () => this.submitted = false);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

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
  public loginMessage: string;

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['login']) {
        this.loginMessage = 'Please, press the data!';
      }
    });

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

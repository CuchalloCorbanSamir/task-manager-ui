import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      username: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ]

    });
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.auth
        .login(this.loginForm.value)
        .subscribe({

          next: response => {

            this.auth.saveTokens(
              response.accessToken,
              response.refreshToken
            );

            this.router.navigate([
              '/dashboard'
            ]);

          },

          error: err => {

            console.error(err);

          }

        });
  }

}
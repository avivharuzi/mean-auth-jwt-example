import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  hide: boolean;
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.isLoading = false;
    this.hide = true;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.login();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  private login(): void {
    this.isLoading = true;

    const body = this.loginForm.value;

    this.authService.login(body).subscribe(_ => {
      this.router.navigate(['/']).then();

      this.errorMessage = null;
      this.isLoading = false;
    }, error => {
      this.errorMessage = error.error.message;
      this.isLoading = false;
    });
  }
}

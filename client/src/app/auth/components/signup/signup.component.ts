import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/auth.service';
import { SignupBody } from '../../shared/signup-body';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading: boolean;
  hide: boolean;
  signupForm: FormGroup;
  errorMessage: string;
  isSuccess: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.isLoading = false;
    this.hide = true;
    this.isSuccess = false;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.signup();
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  private signup(): void {
    const body: SignupBody = this.signupForm.value;

    this.authService.signup(body).subscribe(res => {
      this.isSuccess = true;
      this.isLoading = false;
    }, err =>  {
      this.errorMessage = err.error.message;
      this.isLoading = false;
    });
  }
}

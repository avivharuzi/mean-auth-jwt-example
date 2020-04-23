import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
  ) {
    this.isLoading = false;
    this.hide = true;
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
    // TODO:: Sign up here...
  }
}

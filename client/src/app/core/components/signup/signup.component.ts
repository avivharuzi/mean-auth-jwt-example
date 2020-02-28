import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide: boolean;

  isLoading: boolean;

  form: FormGroup;

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
    if (this.form.invalid) {
      return;
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [],
      lastName: [],
      email: [],
      password: [],
    });
  }

  private signup(): void {
    // Sign up here...
  }
}

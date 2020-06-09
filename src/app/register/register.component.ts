import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordMatch } from '../validators/passwords-match-validator';
import { AuthorizationService } from '../services/authorization.service';
import { RegisterModel } from '../models/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[0-9]).*$'),
          ],
        ],
        repeatPassword: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
      },
      {
        validator: PasswordMatch('password', 'repeatPassword'),
      }
    );
  }

  ngOnInit(): void {}

  getFirstNameErrorMessage() {
    if (this.registerForm.controls.firstName.hasError('required')) {
      return 'You must enter your first name';
    }
  }

  getLastNameErrorMessage() {
    if (this.registerForm.controls.lastName.hasError('required')) {
      return 'You must enter your last name';
    }
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return 'You must enter a valid email';
    }
    return this.registerForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'You must enter your password';
    }
    if (this.registerForm.controls.password.hasError('minlength')) {
      return 'Your password must be at least 8 characters long';
    }
    if (this.registerForm.controls.password.hasError('pattern')) {
      return 'Your password must contain at least an uppercase letter and a number';
    }
  }

  checkRepeatPassword() {
    if (this.registerForm.controls.repeatPassword.hasError('required')) {
      return 'You must re-enter your password';
    }
    if (this.registerForm.controls.repeatPassword.hasError('mustMatch')) {
      return 'Passwords do not match';
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.authorizationService
        .register(
          new RegisterModel(
            this.registerForm.controls.email.value,
            this.registerForm.controls.password.value,
            this.registerForm.controls.firstName.value,
            this.registerForm.controls.lastName.value
          )
        )
        .subscribe(
          (data) => {
            alert(data.response);
            this.router.navigate(['/login']);
          },
          (error) => {
            alert(error.error.response);
          }
        );
    }
  }
}

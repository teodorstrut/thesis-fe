import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';
import { LoginModel } from '../models/login.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter your password';
    }
  }

  login() {
    if (this.password.valid && this.email.valid) {
      this.authorizationService
        .login(new LoginModel(this.email.value, this.password.value))
        .subscribe(
          (data: string) => {
            this.authorizationService.setToken(data);
            this.sharedService.sendLogInTrigger();
            this.router.navigate(['/popular'], {
              relativeTo: this.activatedRoute,
            });
          },
          (error) => {
            alert(error.error);
          }
        );
    }
  }
}

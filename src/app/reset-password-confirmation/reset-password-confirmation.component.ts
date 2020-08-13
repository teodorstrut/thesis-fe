import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-reset-password-confirmation',
  templateUrl: './reset-password-confirmation.component.html',
  styleUrls: ['./reset-password-confirmation.component.scss'],
})
export class ResetPasswordConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.email) {
        this.authService
          .sendPasswordChangeConfirmation(params.email)
          .subscribe((data) => {
            alert(data);
          });
      }
    });
  }
}

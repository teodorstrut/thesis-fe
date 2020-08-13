import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { UserService } from '../services/user.service';
import { FILE_TYPES } from '../constants';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { PasswordMatch } from '../validators/passwords-match-validator';
import { PasswordChangeRequestModel } from '../models/password-change-request.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  colorCode: string;
  textColor: string;
  firstName: string;
  lastName: string;
  fileType: any;
  fileUrl: any;
  isImage = false;
  error = '';
  showButtons = false;
  changePasswordForm: FormGroup;
  constructor(
    private authSerivce: AuthorizationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.colorCode = this.authSerivce.getCurrentUserColorCode();
    this.firstName = this.authSerivce.getCurrentUserFirstName();
    this.lastName = this.authSerivce.getCurrentUserLastName();
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[0-9]).*$'),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*?[A-Z])(?=.*?[0-9]).*$'),
          ],
        ],
        newRepeatPassword: ['', [Validators.required]],
      },
      {
        validator: PasswordMatch('newPassword', 'newRepeatPassword'),
      }
    );
  }

  ngOnInit(): void {
    this.userService
      .getUserProfileImage(this.authSerivce.getCurrentUserId())
      .subscribe((data) => {
        this.fileUrl =
          'data:image/png;base64,' +
          (this.sanitizer.bypassSecurityTrustUrl(data) as any)
            .changingThisBreaksApplicationSecurity;
        this.isImage = true;
      });
  }

  decideTextColor() {
    const color =
      this.colorCode.charAt(0) === '#'
        ? this.colorCode.substring(1, 7)
        : this.colorCode;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179
      ? (this.textColor = '#000000')
      : (this.textColor = '#ffffff');
  }

  sendToPreview(file: any) {
    if (file.files[0].length === 0) {
      return;
    }
    this.fileType = file.files[0].type;
    if (this.fileType.match(/image\/*/) !== null) {
      this.isImage = true;
      this.error = null;
    } else {
      this.error = 'Images supported only';
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onload = (event) => {
      this.fileUrl = fileReader.result;
      this.showButtons = true;
    };
  }

  saveUserProfilePicture() {
    let fileUrlSanitized;
    if (FILE_TYPES.indexOf(this.fileType) > -1) {
      fileUrlSanitized = this.fileUrl.replace(
        'data:' + this.fileType + ';base64,',
        ''
      );
    }
    this.userService
      .updateUserProfileImage(
        this.authSerivce.getCurrentUserId(),
        fileUrlSanitized
      )
      .subscribe((data) => {
        this.userService.sendProfilePictureChanged(this.fileUrl);
        this.showButtons = false;
      });
  }

  cancelSaveUserProfilePicture() {
    this.showButtons = false;
    this.fileUrl = null;
  }

  getPasswordErrorMessage(password: AbstractControl) {
    if (password.hasError('required')) {
      return 'You must enter a valid password';
    }
    if (password.hasError('minlength')) {
      return 'Your password must be at least 8 characters long';
    }
    if (password.hasError('pattern')) {
      return 'Your password must contain at least an uppercase letter and a number';
    }
  }

  checkRepeatPassword() {
    if (
      this.changePasswordForm.controls.newRepeatPassword.hasError('required')
    ) {
      return 'You must re-enter your password';
    }
    if (
      this.changePasswordForm.controls.newRepeatPassword.hasError('mustMatch')
    ) {
      return 'Passwords do not match';
    }
  }

  sendPasswordChangeRequest() {
    if (this.changePasswordForm.valid) {
      const newPasswordChangeRequest = new PasswordChangeRequestModel(
        this.authSerivce.getCurrentUserEmail(),
        this.changePasswordForm.controls.oldPassword.value,
        this.changePasswordForm.controls.newPassword.value
      );
      this.authSerivce
        .sendPasswordChangeRequest(newPasswordChangeRequest)
        .subscribe((data) => {
          alert(data);
          this.changePasswordForm.reset();
        });
    }
  }
}

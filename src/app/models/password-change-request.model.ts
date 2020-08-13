export class PasswordChangeRequestModel {
  private userName: string;
  private oldPassword: string;
  private newPassword: string;

  public constructor(
    userName: string,
    oldPassword: string,
    newPassword: string
  ) {
    this.userName = userName;
    this.newPassword = newPassword;
    this.oldPassword = oldPassword;
  }
}

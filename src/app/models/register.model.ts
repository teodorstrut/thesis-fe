export class RegisterModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  public constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

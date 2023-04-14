export interface User {
  userId: String;
  name: String;
  email: String;
  mobile?: Number;
}

export interface UserRegister {
  name: String;
  email: String;
  password?: String;
  confirmPasswrd?: String;
}

export interface UserLogin {
  email: String;
  password: String;
}

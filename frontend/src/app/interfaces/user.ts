export interface User {
  userId: string;
  name: string;
  email: string;
  user: boolean;
  mobile?: string;
  overlay?: boolean;
}

export interface UserRegister {
  name?: string;
  email: string;
  password: string;
  confirmPasswrd?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

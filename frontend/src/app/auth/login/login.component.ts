import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserLogin } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userLogin: any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
  });

  get email() {
    return this.userLogin.get('email');
  }

  get password() {
    return this.userLogin.get('password');
  }

  constructor(private getUserService: UserService) {}

  handleFormSubmit = () => {
    let data = {
      email: this.userLogin.get('email').value,
      password: this.userLogin.get('password').value,
    };

    this.getUserService.login(data).subscribe((res) => {
      console.log('login:', res);
    });
  };
}

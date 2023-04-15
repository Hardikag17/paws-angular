import { Component } from '@angular/core';
import { UserRegister } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: UserRegister = {
    email: '',
    name: '',
    password: '',
    confirmPasswrd: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  handleFormSubmit = () => {
    const newuser: UserRegister = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      confirmPasswrd: this.user.confirmPasswrd,
    };

    console.log(newuser);
    this.userService.newUser(newuser).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };
}

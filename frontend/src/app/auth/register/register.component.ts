import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
// import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    userId: '',
    email: '',
    name: '',
    password: '',
    confirmPasswrd: '',
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  handleFormSubmit = () => {
    const newuser: User = {
      userId: '',
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      confirmPasswrd: this.user.confirmPasswrd,
    };

    this.userService.newUser(newuser);
  };
}

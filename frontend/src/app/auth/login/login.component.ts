import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage.service';

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

  constructor(
    private getUserService: UserService,
    private getStateService: StorageService,
    private router: Router
  ) {
    this.getStateService.getUserState().subscribe({
      next: (res) => {
        if (res.user) {
          this.router.navigate(['', 'adopt']).then(
            (nav) => {
              console.log('router navigation', nav);
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  handleFormSubmit = () => {
    let data = {
      email: this.userLogin.get('email').value,
      password: this.userLogin.get('password').value,
    };

    this.getUserService.login(data).subscribe({
      next: (res) => {
        console.log(res);
        this.getStateService.setUserState();
        this.router.navigate(['', 'adopt']).then(
          (nav) => {
            console.log('router navigation', nav);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };
}

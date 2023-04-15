import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user!: User;
  constructor(
    private getStorageService: StorageService,
    private userService: UserService
  ) {
    this.getStorageService.getUserState().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  Logout = () => {
    this.userService.logout();
    this.user = this.getStorageService.clearUserState();
  };
}

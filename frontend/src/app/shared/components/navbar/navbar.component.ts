import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { PetsService } from 'src/app/services/api/pets.service';
import { UserService } from 'src/app/services/api/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Pet } from 'src/app/interfaces/pet';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user!: User;
  searchText: string = '';
  searchResults!: Pet[];
  constructor(
    private getStorageService: StorageService,
    private userService: UserService,
    private petsServcie: PetsService,
    private router: Router
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

  getPets = (searchText: string) => {
    this.searchText = searchText;
    if (searchText.length > 0) this.user.overlay = true;
    else this.user.overlay = false;
    this.petsServcie.searchPets(searchText).subscribe({
      next: (data) => {
        let res = data.response;
        if (res.length > 0) {
          this.searchResults = [];
          this.searchResults = res;
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });

    console.warn(this.searchResults);
  };

  Logout = () => {
    this.userService.logout();
    this.user = this.getStorageService.clearUserState();
    this.user.user = false;
    this.router.navigate(['', 'adopt']).then(
      (nav) => {
        console.log('router navigation', nav);
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

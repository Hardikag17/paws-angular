import { Component } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/api/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  icons = { faPenToSquare };
  userInfo!: User;

  constructor(
    private getStorageService: StorageService,
    private userService: UserService
  ) {
    this.getStorageService.getUserState().subscribe({
      next: (res) => {
        console.log(res);
        this.userInfo = res;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log('files', fileList);
    }
  };
}

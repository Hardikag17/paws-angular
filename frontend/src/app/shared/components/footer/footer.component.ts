import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  user!: User;

  constructor(private getStorageService: StorageService) {}

  ngOnInit() {
    this.getStorageService.getUserState().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}

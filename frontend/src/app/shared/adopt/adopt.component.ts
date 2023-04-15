import { Component } from '@angular/core';
import {
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import { PetsService } from 'src/app/services/api/pets.service';
import { Pet } from 'src/app/interfaces/pet';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css'],
})
export class AdoptComponent {
  icons = { faForwardStep, faBackwardStep };
  Pets: Pet[] = [];
  page: Number = 1;

  constructor(private PetsService: PetsService) {}

  ngOnInit() {
    this.PetsService.getPets(this.page).subscribe({
      next: (res) => {
        this.Pets = res;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}

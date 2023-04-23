import { Component, OnInit } from '@angular/core';
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
export class AdoptComponent implements OnInit {
  icons = { faForwardStep, faBackwardStep };
  Pets: Pet[] = [];
  page: number = 1;

  constructor(private PetsService: PetsService) {}

  ngOnInit() {
    this.getPets();
  }

  moveForword = () => {
    this.page++;
    this.getPets();
  };

  moveBackword = () => {
    if (this.page - 1 > 0) this.page--;
    this.getPets();
  };

  getPets = () => {
    this.PetsService.getPets(this.page).subscribe({
      next: (res) => {
        this.Pets = res.response;
        console.log(this.Pets[0].PetID);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };
}

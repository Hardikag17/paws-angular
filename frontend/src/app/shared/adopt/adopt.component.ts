import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import { PetsService } from 'src/app/services/api/pets.service';
import { Pet } from 'src/app/interfaces/pet';
import { OptionsService } from 'src/app/services/api/options.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css'],
})
export class AdoptComponent implements OnInit {
  icons = { faForwardStep, faBackwardStep };
  BreedOptions!: [{ label: string; value: number }];
  Pets: Pet[] = [];
  page: number = 1;
  max: number = 40;
  min: number = 1;
  breed!: any;
  gender!: any;
  health!: any;

  constructor(
    private PetsService: PetsService,
    private optionsService: OptionsService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
    this.optionsService
      .getBreedOptions()
      .subscribe((res) => (this.BreedOptions = res));
  }

  selectBreed = (id: number) => {
    this.breed = id;
    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
  };
  selectGender = (id: number) => {
    this.gender = id;
    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
  };
  addHealth = (health: number) => {
    this.health = health;

    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
  };

  moveForword = () => {
    this.page++;
    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
  };

  moveBackword = () => {
    if (this.page - 1 > 0) this.page--;
    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
  };

  getPets = (
    page: number,
    min: number,
    max: number,
    gender: string,
    breed: string,
    health: string
  ) => {
    this.PetsService.getPets(page, min, max, gender, breed, health).subscribe({
      next: (res) => {
        this.Pets = res.response;
        console.log('Pets', this.Pets[0].PetID);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };

  minAgeChange = (event: any) => {
    this.min = JSON.parse(event.target.value);
    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
  };

  maxAgeChange = (event: any) => {
    this.max = JSON.parse(event.target.value);
    this.getPets(
      this.page,
      this.min,
      this.max,
      this.gender,
      this.breed,
      this.health
    );
  };
}

import { Component } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Pet } from 'src/app/interfaces/pet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OptionsService } from 'src/app/services/api/options.service';

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css'],
})
export class AddpetComponent {
  icons = { faLocationDot };
  preview = ['', '', '', ''];
  Pet: Pet = {
    PetID: '',
    Type: 4,
    Name: '',
    Age: 0,
    Breed1: 0,
    Gender: 3,
    Color1: 0,
    Vaccinated: 0,
    Sterilized: 0,
    Health: 0,
    State: 0,
    City: '',
    RescuerID: '',
    Description: '',
    PhotoAmt: 0,
  };

  addPet: any = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    Address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    City: new FormControl('', [Validators.required]),
    State: new FormControl('', [Validators.required]),
  });

  constructor(private optionsService: OptionsService) {}

  ngOnInit() {
    this.optionsService.getBreedOptions().subscribe((res) => console.log(res));
    this.optionsService.getStateOptions().subscribe((res) => console.log(res));
  }

  get Name() {
    return this.addPet.get('Name');
  }
  get Description() {
    return this.addPet.get('Description');
  }

  get Address() {
    return this.addPet.get('Address');
  }

  addHealth = (health: number) => {
    this.Pet.Health = health;
  };

  addVaccinated = (Vaccinated: number) => {
    this.Pet.Vaccinated = Vaccinated;
  };
  addSterilized = (Sterilized: number) => {
    this.Pet.Sterilized = Sterilized;
  };

  handleFormSubmit = () => {
    this.Pet = {
      ...this.Pet,
      Name: this.addPet.get('Name').value,
      Type: 0,
      Age: 0,
      Breed1: 0,
      Gender: 3,
      Color1: 0,
      State: this.addPet.get('State').value,
      City: this.addPet.get('City').value,
      RescuerID: '',
      Description: this.addPet.get('Description').value,
      PhotoAmt: 4,
    };

    console.log('Pet', this.Pet);
  };
}

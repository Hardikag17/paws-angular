import { Component } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Pet } from 'src/app/interfaces/pet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OptionsService } from 'src/app/services/api/options.service';
import { PetsService } from 'src/app/services/api/pets.service';

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css'],
})
export class AddpetComponent {
  icons = { faLocationDot };
  BreedOptions!: [{ label: string; value: number }];
  stateOptions!: [{ label: string; value: number }];
  ageOptions = new Array(100);
  alert: { bool: boolean; message: string } = {
    bool: false,
    message: 'Error: Someting went wrong please try again',
  };

  preview: any = [
    '../../../assets/icons/elephant.jpg',
    '../../../assets/icons/elephant.jpg',
    '../../../assets/icons/elephant.jpg',
    '../../../assets/icons/elephant.jpg',
  ];
  Pet: Pet = {
    PetID: '',
    Type: 4,
    Name: '',
    Age: 0,
    Breed1: 0,
    Gender: 3,
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

  constructor(
    private optionsService: OptionsService,
    private getPetService: PetsService
  ) {}

  ngOnInit() {
    this.optionsService
      .getBreedOptions()
      .subscribe((res) => (this.BreedOptions = res));
    this.optionsService
      .getStateOptions()
      .subscribe((res) => (this.stateOptions = res));
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

  addHealth = (health: number) => (this.Pet.Health = health);

  addVaccinated = (Vaccinated: number) => (this.Pet.Vaccinated = Vaccinated);

  addSterilized = (Sterilized: number) => (this.Pet.Sterilized = Sterilized);

  selectBreed = (id: number) => (this.Pet.Breed1 = id);

  selectState = (id: number) => (this.Pet.State = id);

  selectType = (id: number) => (this.Pet.Type = id);

  selectGender = (id: number) => (this.Pet.Gender = id);

  selectAge = (id: number) => (this.Pet.Age = id);

  getLocation = () => {
    let location: {};
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
    } else {
      console.log('loading...');
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          location = {
            lat: position.coords.latitude,
            loc: position.coords.longitude,
          };
          //  this.Pet.location = { location.lat, location.loc };
        },
        () => {
          console.log('Unable to get the location');
        }
      );
    }
  };

  handleFormSubmit = () => {
    if (this.Pet.PetID.length > 0) {
      let userId: any = sessionStorage.getItem('state');
      userId = JSON.parse(userId).userId;
      this.Pet = {
        ...this.Pet,
        Name: this.addPet.get('Name').value,
        State: this.addPet.get('State').value,
        City: this.addPet.get('City').value,
        RescuerID: userId,
        Description: this.addPet.get('Description').value,
        PhotoAmt: 4,
      };

      this.getPetService.addPet(this.Pet).subscribe((res) => console.log(res));
    } else alert('Please select the images to upload');
  };

  uploadImages = async (event: any) => {
    let selectedFiles = event.target.files;
    if (selectedFiles.length !== 4) alert('You must upload 4 images');
    // else {
    //   // Upload Image to s3 servers
    //   this.Pet.PetID = await this.getPetService.uploadImages(selectedFiles);
    // }

    this.Pet.PetID = 'test';

    this.preview = [];
    [...selectedFiles].forEach((element) => {
      const objectUrl = URL.createObjectURL(element);
      console.log(objectUrl);
      this.preview.push(objectUrl);
    });
  };
}

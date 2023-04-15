// import { Social } from './social';
export interface Pet {
  PetID: string;
  Type: {
    type: Number;
    enum: [1, 2, 3, 4]; // 1 = Dog, 2 = Cat, 3=Cow, 4=Cat
  };
  Name: string;
  Age: Number;
  Breed1: Number;
  Gender: {
    type: Number;
    enum: [1, 2, 3]; //1 = Male, 2 = Female, 3 = Not specified
  };
  Color1: Number;
  Vaccinated: {
    type: Number;
    enum: [1, 2, 3]; //1 = Yes, 2 = No, 3 = Not Sure
  };
  Sterilized: {
    type: Number;
    enum: [1, 2, 3]; //1 = Yes, 2 = No, 3 = Not Sure
  };
  Health: {
    type: Number;
    enum: [0, 1, 2, 3]; // 1 = Healthy, 2 = Minor Injury, 3 = Serious Injury, 0 = Not Specified
  };
  State: Number;
  City: string;
  RescuerID: string;
  social: [string];
  updatedAt: Date;
  Description: string;
  PhotoAmt: Number;
}

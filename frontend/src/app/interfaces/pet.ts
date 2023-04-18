// import { Social } from './social';
export interface Pet {
  PetID: string;
  Type: {
    type: number;
    enum: [1, 2, 3, 4]; // 1 = Dog, 2 = Cat, 3=Cow, 4=Cat
  };
  Name: string;
  Age: number;
  Breed1: number;
  Gender: {
    type: number;
    enum: [1, 2, 3]; //1 = Male, 2 = Female, 3 = Not specified
  };
  Color1: number;
  Vaccinated: {
    type: number;
    enum: [1, 2, 3]; //1 = Yes, 2 = No, 3 = Not Sure
  };
  Sterilized: {
    type: number;
    enum: [1, 2, 3]; //1 = Yes, 2 = No, 3 = Not Sure
  };
  Health: {
    type: number;
    enum: [0, 1, 2, 3]; // 1 = Healthy, 2 = Minor Injury, 3 = Serious Injury, 0 = Not Specified
  };
  State: number;
  City: string;
  RescuerID: string;
  social: [string];
  updatedAt: string;
  Description: string;
  PhotoAmt: number;
}

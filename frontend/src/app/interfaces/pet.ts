// import { Social } from './social';
export interface Pet {
  PetID: string;
  Type: number; // 1 = Dog, 2 = Cat, 3=Cow, 4=Cat
  Name: string;
  Age: number;
  Breed1: number;
  Gender: number; //1 = Male, 2 = Female, 3 = Not specified
  Color1?: number;
  Vaccinated: number; //1 = Yes, 2 = No, 3 = Not Sure
  Sterilized: number; //1 = Yes, 2 = No, 3 = Not Sure
  Health: number; // 1 = Healthy, 2 = Minor Injury, 3 = Serious Injury, 0 = Not Specified
  State: number;
  City: string;
  RescuerID: string;
  social?: [string];
  updatedAt?: string;
  Description: string;
  PhotoAmt: number;
}

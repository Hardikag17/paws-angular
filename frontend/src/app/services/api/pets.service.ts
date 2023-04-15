import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Pet } from 'src/app/interfaces/pet';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private http: HttpClient) {}

  getPets = (page: Number): Observable<any> => {
    return this.http.get(`${API_ROOT}/pets?page=${page}`);
  };

  getPetByPetID = (PetID: string): Observable<Pet> => {
    let response: any = this.http.get(`${API_ROOT}/pets/pet/${PetID}`);

    response = response.data.response;
    return response;
  };

  adoptPet = (Pet: Pet, userId: string) => {
    return this.http.post(`${API_ROOT}/pets/adopt`, {
      PetID: Pet.PetID,
      UserID: userId,
      RescuerID: Pet.RescuerID,
    });
  };
}

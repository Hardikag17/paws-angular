import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Pet } from 'src/app/interfaces/pet';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private http: HttpClient) {}

  addPet = (Pet: Pet) => {
    
  };

  getPets = (page: Number): Observable<any> => {
    return this.http.get(`${API_ROOT}/pets?page=${page}`);
  };

  getPetByPetID = (PetID: string | null): Observable<any> => {
    return this.http.get(`${API_ROOT}/pets/pet/${PetID}`);
  };

  adoptPet = (Pet: Pet, userId: string) => {
    return this.http.post(`${API_ROOT}/pets/adopt`, {
      PetID: Pet.PetID,
      UserID: userId,
      RescuerID: Pet.RescuerID,
    });
  };

  searchPets = (searchText: string): Observable<any> => {
    return this.http.get(`${API_ROOT}/pets?searchText=${searchText}`);
  };

  sendPetRequest = (
    PetID: string | null,
    UserID: string
  ): Observable<string> => {
    return this.http
      .post(`${API_ROOT}/pets/requestpet`, {
        PetID: PetID,
        UserID: UserID,
      })
      .pipe(
        map((res: any) => {
          return res.message;
        })
      );
  };
}

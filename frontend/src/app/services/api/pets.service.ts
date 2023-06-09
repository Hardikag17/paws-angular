import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Pet } from 'src/app/interfaces/pet';
import { Observable, map, from, tap } from 'rxjs';
import * as upload from 'superagent';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private http: HttpClient) {}

  addPet = (Pet: Pet): Observable<{ status: number; message: string }> => {
    return this.http.post(`${API_ROOT}/pets/addpet`, { Pet }).pipe(
      map((res: any) => {
        return { status: res.status, message: res.message };
      })
    );
  };

  uploadImages = async (selectedFiles: any) => {
    try {
      let res: any = await upload
        .post(`${API_ROOT}/pets/upload`)
        .attach('files', selectedFiles[0])
        .attach('files', selectedFiles[1])
        .attach('files', selectedFiles[2])
        .attach('files', selectedFiles[3]);

      if (res.text.length > 0) {
        return res.text;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getPets = (
    page: number,
    minAge: number,
    maxAge: number,
    gender: string,
    breed: string,
    health: string
  ): Observable<any> => {
    console.log(page, maxAge, minAge, gender, breed, health);
    let url = `${API_ROOT}/pets?page=${page}&&minAge=${minAge}&&maxAge=${maxAge}`;
    if (gender) url += `&&gender=${gender}`;
    if (breed) url += `&&breed=${breed}`;
    if (health) url += `&&health=${health}`;
    return this.http.get(url);
  };

  getPetByPetID = (PetID: string | null): Observable<any> => {
    return this.http.get(`${API_ROOT}/pets/pet/${PetID}`);
  };

  adoptPet = (Pet: Pet, userId: string): Observable<any> => {
    return this.http
      .post(`${API_ROOT}/pets/adopt`, {
        PetID: Pet.PetID,
        UserID: userId,
        RescuerID: Pet.RescuerID,
      })
      .pipe(map((res) => console.log('Adopt Pet', res)));
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

  getNearByPets = (userLocation: {
    lat: number;
    lng: number;
  }): Observable<any> => {
    return this.http
      .get(
        `${API_ROOT}/pets/getNearPets?latitude=${userLocation.lat}&&longitude=${userLocation.lng}`
      )
      .pipe(
        map((res: any) => {
          let final: any = [];
          res.forEach((element: any) => {
            final.push(element.location);
          });
          return { final, res };
        })
      );
  };

  getRecentUpdatedPets = (): Observable<any> => {
    return this.http.get(`${API_ROOT}/pets/recentUpdatedPets`);
  };

  getRecentAddedPets = (): Observable<any> => {
    return this.http.get(`${API_ROOT}/pets/recentAddedPets`);
  };
}

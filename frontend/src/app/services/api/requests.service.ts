import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Pet } from 'src/app/interfaces/pet';
import { Observable, map } from 'rxjs';
import { StorageService } from '../storage.service';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  UserID!: User;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.storageService.getUserState().subscribe((res) => (this.UserID = res));
  }

  // Can be only one
  getRequestByUserID = () => {
    console.log(this.UserID);
    return this.http.get(`${API_ROOT}/pets/requests/user/${this.UserID}`).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  };

  getRequestsByPetID = (PetID: string) => {
    return this.http.get(`${API_ROOT}/pets/requests/pet/${PetID}`).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  };

  getRequestsByRescuerID = (RescuerID: string) => {
    return this.http.get(`${API_ROOT}/pets/requests/rescuer/${RescuerID}`).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  };

  requestPet = (PetID: string) => {
    return this.http
      .post(`${API_ROOT}/pets/requestpet`, {
        PetID: PetID,
        UserID: this.UserID,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
        })
      );
  };

  acceptAdoptRequest = (PetID: string, RescuerID: string) => {
    return this.http
      .post(`${API_ROOT}/pets/adopt`, {
        PetID: PetID,
        UserID: this.UserID,
        RescuerID: RescuerID,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
        })
      );
  };

  rejectAdoptRequest = () => {};
}

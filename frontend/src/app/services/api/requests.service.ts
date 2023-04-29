import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Pet } from 'src/app/interfaces/pet';
import { Observable, map, concatMap, switchMap, from, mergeMap } from 'rxjs';
import { PetsService } from './pets.service';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(
    private http: HttpClient,
    private getPetService: PetsService,
    private getUserService: UserService
  ) {}

  // Can be only one
  getRequestByUserID = (): Observable<{ Pet: Pet; status: string }> => {
    let userId: any = sessionStorage.getItem('state');
    userId = JSON.parse(userId).userId;
    return this.http.get(`${API_ROOT}/pets/requests/user/${userId}`).pipe(
      concatMap((response: any) =>
        this.getPetService.getPetByPetID(response.PetID).pipe(
          map((Pet) => {
            return { Pet: Pet.response, status: response.status };
          })
        )
      )
    );
  };

  getRequestsByPetID = (PetID: string) => {
    return this.http.get(`${API_ROOT}/pets/requests/pet/${PetID}`).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  };

  getRequestsByRescuerID = (): Observable<
    [{ Pet: Pet; requests: [string] }]
  > => {
    let RescuerID: any = sessionStorage.getItem('state');
    RescuerID = JSON.parse(RescuerID).userId;
    return this.http.get(`${API_ROOT}/pets/requests/rescuer/${RescuerID}`).pipe(
      map((response: any) => {
        let tmp: any = [];
        response.Requests.forEach((el: any) => {
          tmp.push({ Pet: el.Pet, requests: el.requests });
        });
        console.log('final', tmp);
        return tmp;
      })
    );
  };

  requestPet = (PetID: string) => {
    let userId: any = sessionStorage.getItem('state');
    userId = JSON.parse(userId).userId;
    return this.http
      .post(`${API_ROOT}/pets/requestpet`, {
        PetID: PetID,
        UserID: userId,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
        })
      );
  };

  cancelRequest = () => {
    let userId: any = sessionStorage.getItem('state');
    userId = JSON.parse(userId).userId;
    return this.http.post(`${API_ROOT}/pets//deleterequest`, {
      UserID: userId,
    });
  };

  acceptAdoptRequest = (PetID: string, RequesterID: string) => {
    let userId: any = sessionStorage.getItem('state');
    userId = JSON.parse(userId).userId;
    return this.http
      .post(`${API_ROOT}/pets/adopt`, {
        PetID: PetID,
        UserID: RequesterID,
        RescuerID: userId,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
        })
      );
  };

  rejectAdoptRequest = (PetID: string, RequesterID: string) => {
    let userId: any = sessionStorage.getItem('state');
    userId = JSON.parse(userId).userId;
    return this.http
      .post(
        `${API_ROOT}/pets/rejectRequest`,
        {
          PetID: PetID,
          UserID: RequesterID,
          RescuerID: userId,
        },
        { responseType: 'text' }
      )
      .pipe(
        map((res: any) => {
          console.log(res);
        })
      );
  };
}

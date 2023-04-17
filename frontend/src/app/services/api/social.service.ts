import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Social, SocialList } from 'src/app/interfaces/social';
import { Observable, map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private http: HttpClient) {}

  getlikes = (PetID: string, userId: string) => {
    return this.http.get(`${API_ROOT}/social/${PetID}/${userId}/like`);
  };

  addComment = (SocialData: Social): Observable<any> => {
    return this.http
      .post(`${API_ROOT}/social/${SocialData.PetID}/social`, {
        SocialData,
      })
      .pipe(
        map((response) => {
          console.log(response);
        })
      );
  };

  getSocialList = (PetID: string | null): Observable<SocialList[]> => {
    return this.http.get(`${API_ROOT}/social/${PetID}/getSocial`).pipe(
      map((res: any) => {
        return res.response;
      })
    );
  };

  deleteSocial = (PetID: string, SocialId: string) => {
    return this.http
      .get(`${API_ROOT}/social/${PetID}/${SocialId}/deletesocial`)
      .pipe(
        tap((res) => {
          this.getSocialList(PetID);
        })
      );
  };
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Social, SocialList } from 'src/app/interfaces/social';
import { Observable, map, tap, concatMap, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private http: HttpClient) {}

  getlikes = (
    PetID: string | null
  ): Observable<{ count: number; status: boolean }> => {
    let userId: any = sessionStorage.getItem('state');
    userId = JSON.parse(userId).userId;

    return this.http
      .get(`${API_ROOT}/social/${PetID}/${userId}/like`, {
        responseType: 'text',
      })
      .pipe(
        map((response: any) => {
          return JSON.parse(response);
        })
      );
  };

  addComment = (SocialData: Social): Observable<any> => {
    return this.http
      .post(`${API_ROOT}/social/${SocialData.PetID}/social`, {
        SocialData,
      })
      .pipe(
        concatMap((response: any) =>
          this.getSocialList(response.PetID).pipe(
            map((updatedSocialList) => {
              return updatedSocialList;
            })
          )
        )
      );
  };

  getSocialList = (PetID: string | null): Observable<SocialList[]> => {
    return this.http.get(`${API_ROOT}/social/${PetID}/getSocial`).pipe(
      map((res: any) => {
        return res.response;
      })
    );
  };

  deleteSocial = (
    PetID: string | null,
    SocialId: string
  ): Observable<SocialList[]> => {
    return this.http
      .get(`${API_ROOT}/social/${PetID}/${SocialId}/deletesocial`, {
        responseType: 'text',
      })
      .pipe(
        concatMap(() =>
          this.getSocialList(PetID).pipe(
            map((updatedSocialList) => {
              return updatedSocialList;
            })
          )
        )
      );
  };
}

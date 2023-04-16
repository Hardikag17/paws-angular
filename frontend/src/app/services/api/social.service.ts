import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
@Injectable({
  providedIn: 'root',
})
export class SocialService {
  constructor(private http: HttpClient) {}

  getlikes = (PetID: string, userId: string) => {
    return this.http.get(`${API_ROOT}/social/${PetID}/${userId}/like`);
  };

  addComment = () => {};

  getSocialList = () => {};

  deleteSocial = () => {};
}

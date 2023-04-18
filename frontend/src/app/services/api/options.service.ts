import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private http: HttpClient) {}

  getBreedOptions = (): Observable<any> => {
    return this.http
      .get(`${API_ROOT}/options/breeds`)
      .pipe(map((res) => console.log(res)));
  };

  getStateOptions = (): Observable<any> => {
    return this.http
      .get(`${API_ROOT}/options/states`)
      .pipe(map((res) => console.log(res)));
  };
}

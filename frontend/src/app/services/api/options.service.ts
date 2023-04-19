import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from 'src/app/api-config';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private http: HttpClient) {}

  getBreedOptions = (): Observable<[{ value: number; label: string }]> => {
    return this.http.get(`${API_ROOT}/options/breeds`).pipe(
      map((res: any) => {
        return res.options;
      })
    );
  };

  getStateOptions = (): Observable<[{ value: number; label: string }]> => {
    return this.http.get(`${API_ROOT}/options/states`).pipe(
      map((res: any) => {
        return res.options;
      })
    );
  };
}

import { Injectable } from '@angular/core';
import { API_ROOT } from '../../api-config';
import { User, UserLogin, UserRegister } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  newUser = (user: UserRegister) => {
    return this.http.post(
      `${API_ROOT}/user/register`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      { responseType: 'text' }
    );
  };

  login = (user: UserLogin) => {
    return this.http.post(
      `${API_ROOT}/user/login`,
      {
        email: user.email,
        password: user.password,
      },

      { withCredentials: true }
    );
  };

  logout = (): Observable<Object> => {
    return this.http.get(`${API_ROOT}/user/logout`, {
      withCredentials: true,
      responseType: 'text',
    });
  };

  getUserInfo = (UserID: string) => {
    return this.http.post(`${API_ROOT}/user/userInfo`, {
      UserID: UserID,
    });
  };

  getUserState = () => {
    return this.http.get(`${API_ROOT}/user/info`, {
      withCredentials: true,
    });
  };
}

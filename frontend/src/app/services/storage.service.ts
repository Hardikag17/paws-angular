import { Injectable } from '@angular/core';
import { StateService } from '../shared/state/state.service';
import { User } from '../interfaces/user';
import { UserService } from './api/user.service';
import { Observable } from 'rxjs';
const initialState: User = {
  userId: '',
  email: '',
  name: '',
  user: false,
  overlay: false,
  mobile: '',
};

@Injectable({
  providedIn: 'root',
})
export class StorageService extends StateService<User> {
  constructor(private apiService: UserService) {
    super(initialState);

    this.setUserState();
  }

  // GET USER STATE
  getUserState = (): Observable<User> =>
    this.select((state) => {
      return state;
    });

  // SET USER STATE
  setUserState = () => {
    this.apiService.getUserState().subscribe({
      next: (user: any) => {
        let finalState: User;
        finalState = {
          userId: user[0].userId,
          email: user[0].email,
          name: user[0].name,
          user: true,
          overlay: false,
          mobile: user[0].mobile,
        };

        sessionStorage.setItem('state', JSON.stringify(finalState));
        this.setState(finalState);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };

  // CLEAR USER STATE
  clearUserState = () => {
    this.apiService.logout().subscribe({
      next: (res: any) => {
        console.log('res', res);

        console.log('user state cleared:');
        sessionStorage.clear();
        this.setState(initialState);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });

    return initialState;
  };
}

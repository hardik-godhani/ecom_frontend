import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }

  setUserData(user: User) {
    if(user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUserData(): User {
    let data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  isUserLogin(): boolean {
    return this.getUserData() ? true : false;
  }
}

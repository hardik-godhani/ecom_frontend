import { RegisterData } from './../models/auth.models';
import { User } from './../models/user.model';
import { Environment } from './../../../environments/environment';
import { APIResponse } from './../models/apiResponse.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList(): Observable<APIResponse<User[]>> {
    return this.http.get( Environment.url + '/user') as Observable<APIResponse<User[]>>;
  }

  createUser(payload: RegisterData): Observable<APIResponse<User>> {
    return this.http.post( Environment.url + '/user/create', payload) as Observable<APIResponse<User>>;
  }
}

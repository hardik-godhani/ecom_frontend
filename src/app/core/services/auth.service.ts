import { User } from './../models/user.model';
import { APIResponse } from './../models/apiResponse.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { LoginData, RegisterData } from '../models/auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: LoginData): Observable<APIResponse<User>> {
    return this.http.post( Environment.url + '/auth/login', payload) as Observable<APIResponse<User>>;
  }

  register(payload: RegisterData): Observable<APIResponse<null>> {
    return this.http.post( Environment.url + '/auth/register', payload) as Observable<APIResponse<null>>;
  }
}

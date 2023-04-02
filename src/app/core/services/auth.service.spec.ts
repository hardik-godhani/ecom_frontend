import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginData, RegisterData } from '../models/auth.models';
import { User } from '../models/user.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should use POST method', () => {
    const expectedData: LoginData = {email: "johndoe@gmail.com", password: "123456"}
    service.login(expectedData).subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/auth/login');
    expect(testRequest.request.method).toEqual('POST');
  });

  it('register should use POST method', () => {
    const expectedData: RegisterData = {fname: "John", lname: "Doe", phone: "1234567890", email: "johndoe@gmail.com", password: "123456"}
    service.register(expectedData).subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/auth/register');
    expect(testRequest.request.method).toEqual('POST');
  });

  it('login should return expected data', () => {
    const expectedData: LoginData = {email: "johndoe@gmail.com", password: "123456"}
    const mockUser: User = { id: 1, fname: 'John', lname: 'Doe', role: 'admin', phone: '12345678999', token: '132fsd3f1df', email: 'johndoe@example.com' };
    service.login(expectedData).subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/auth/login');
    testRequest.flush({status: "SUCCESS", data: mockUser, message: ""});
    });

    it('register should return expected data', () => {
      const expectedData: RegisterData = {fname: "John", lname: "Doe", phone: "1234567890", email: "johndoe@gmail.com", password: "123456"}
      service.register(expectedData).subscribe();
      const testRequest = httpTestingController.expectOne('http://localhost:5000/auth/register');
      testRequest.flush({status: "SUCCESS", message: ""});
      });  
  });

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RegisterData } from '../models/auth.models';
import { User } from '../models/user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserList should use GET method to get list of users', () => {
    service.getUserList().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/user');
    expect(testRequest.request.method).toEqual('GET');
  });

  it('createUser should use POST method', () => {
    const expectedData: RegisterData = {fname: "John", lname: "Doe", phone: "1234567890", email: "johndoe@gmail.com", password: "123456"}
    service.createUser(expectedData).subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/user/create');
    expect(testRequest.request.method).toEqual('POST');
  });

  it('getUserList should return expected data', () => {
    const mockUser: User = { id: 1, fname: 'John', lname: 'Doe', role: 'admin', phone: '12345678999', token: '132fsd3f1df', email: 'johndoe@example.com' };
    service.getUserList().subscribe();
    const testRequest = httpTestingController.expectOne('http://localhost:5000/user');
    testRequest.flush({status: "SUCCESS", data: mockUser, message: ""});
    });

    it('register should return expected data', () => {
      const expectedData: RegisterData = {fname: "John", lname: "Doe", phone: "1234567890", email: "johndoe@gmail.com", password: "123456"}
      service.createUser(expectedData).subscribe();
      const testRequest = httpTestingController.expectOne('http://localhost:5000/user/create');
      testRequest.flush({status: "SUCCESS", message: ""});
      });  
});

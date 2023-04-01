import { TestBed } from '@angular/core/testing';
import { LocalStoreService } from '../services/local-store.service';

import { HttpConfigInterceptor } from './http-config.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../models/user.model';
import { HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';

fdescribe('HttpConfigInterceptor', () => {
  let localStoreService: jasmine.SpyObj<LocalStoreService>;
  let interceptor: HttpConfigInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    let spy = jasmine.createSpyObj("LocalStoreService", ["getUserData"])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpConfigInterceptor, {provide: LocalStoreService, useValue: spy}
      ]
    });
    localStoreService = TestBed.inject(LocalStoreService) as jasmine.SpyObj<LocalStoreService>;
    interceptor = TestBed.inject(HttpConfigInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    const interceptor: HttpConfigInterceptor = TestBed.inject(HttpConfigInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should add authorization into header if userToken is available', () => {
    const userData: User = { id: 1, fname: 'John', lname: 'Doe', role: 'admin', phone: '12345678999', token: '132fsd3f1df', email: 'johndoe@example.com' };
    localStoreService.getUserData.and.returnValue(userData);

    let result = interceptor.intercept(new HttpRequest("GET", "/data"), {handle: (req: HttpRequest<any>): Observable<any> => {
      expect(req.headers.get('Authorization')).toBe('Bearer 132fsd3f1df');
      return of(null);
    }}).subscribe()

    expect(result).toBeTruthy();
  })
}); 

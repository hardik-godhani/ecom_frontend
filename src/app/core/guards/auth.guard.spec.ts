import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { LocalStoreService } from '../services/local-store.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  // let localStore: jasmine.SpyObj<LocalStoreService>;
  let localStore: LocalStoreService;
  let mockSnapshot:any = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ['toString']);
  let router: Router;

  beforeEach(() => {
    // let spy = jasmine.createSpyObj("LocalStoreService", ["isUserLogin"])
    TestBed.configureTestingModule({
      providers: [
      // {provide: LocalStoreService, useValue: spy},
      LocalStoreService,
      {provide: Router, useValue: {navigate: jasmine.createSpy("navigate")}},
      {provide: RouterStateSnapshot, useValue: mockSnapshot}
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    localStore = TestBed.inject(LocalStoreService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should check if user is logged in', () => {
    spyOn(localStore, "isUserLogin").and.returnValue(true);
    guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    expect(guard.canActivate).toBeTruthy;    
  })

  it('should check if user is not logged in', () => {
    spyOn(localStore, "isUserLogin").and.returnValue(false);
    guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(guard.canActivate).toBeFalsy;    
  })

});

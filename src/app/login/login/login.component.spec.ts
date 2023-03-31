import { LoginData } from './../../core/models/auth.models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LocalStoreService } from './../../core/services/local-store.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let localStoreService: LocalStoreService;
  let router: Router;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ["login"]);
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatInputModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [LoginComponent],
      providers: [
        AuthService, LocalStoreService,
        { provide: Router, useValue: {navigateByUrl: jasmine.createSpy("navigateByUrl")} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    localStoreService = TestBed.inject(LocalStoreService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with default values', () => {
    expect(component.loginForm.get("email")?.value).toBe("");
    expect(component.loginForm.get("password")?.value).toBe("");
  });

  it('should mark the form as touched and not call aythService.login when form is invalid', () => {
    spyOn(authService, "login").and.callThrough();
    const mockData = new LoginData();
    mockData.email = "johndoeexample.com";
    mockData.password = "password";

    component.loginForm.setValue(mockData);

    const loginButton = fixture.nativeElement.querySelector('button[id="loginFormSubmit"]');
    loginButton.click();
    expect(component.loginForm.touched).toBeTruthy();
    expect(authService.login).not.toHaveBeenCalled();
  })

  it('should check positive response', () => {
    const mockUser: User = { id: 1, fname: 'John', lname: 'Doe', role: 'admin', phone: '12345678999', token: '132fsd3f1df', email: 'johndoe@example.com' };
    spyOn(authService, "login").and.returnValue(of({status: "SUCCESS", data: mockUser, message:""}));
    spyOn(localStoreService, "setUserData").and.callThrough();
    const mockData = new LoginData();
    mockData.email = "johndoe@example.com";
    mockData.password = "password";

    component.loginForm.setValue(mockData);

    const loginButton = fixture.nativeElement.querySelector('button[id="loginFormSubmit"]');
    loginButton.click();
    expect(authService.login).toHaveBeenCalledWith(mockData);
    expect(localStoreService.setUserData).toHaveBeenCalledWith(mockUser);
    expect(router.navigateByUrl).toHaveBeenCalledWith("");
  })

  it('should check negative response', () => {
    spyOn(authService, "login").and.returnValue(of({status: "ERROR", message:"invalid email or password"}));
    spyOn(localStoreService, "setUserData").and.callThrough();
    const mockData = new LoginData();
    mockData.email = "johndoe@example.com";
    mockData.password = "password";

    component.loginForm.setValue(mockData);

    const loginButton = fixture.nativeElement.querySelector('button[id="loginFormSubmit"]');
    loginButton.click();
    expect(authService.login).toHaveBeenCalledWith(mockData);
    expect(localStoreService.setUserData).not.toHaveBeenCalled();
  }) 
  
});

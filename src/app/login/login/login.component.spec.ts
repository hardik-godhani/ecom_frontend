import { LoginData } from './../../core/models/auth.models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LocalStoreService } from './../../core/services/local-store.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let localStoreService: jasmine.SpyObj<LocalStoreService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ["login"]);
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatInputModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: LocalStoreService, useValue: localStoreService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with default values', () => {
    expect(component.loginForm.get("email")?.value).toBe("");
    expect(component.loginForm.get("password")?.value).toBe("");
  });

  it('should call AuthService.login() when form submit', () => {
    const mockData = new LoginData();
    mockData.email = "hardikgodhani@gmail.com";
    mockData.password = "123456";

    component.loginForm.setValue(mockData);

    const loginButton = fixture.nativeElement.querySelector('button[id="loginFormSubmit"]');
    loginButton.click();
    expect(authService.login).toHaveBeenCalledWith(mockData);
  });
});

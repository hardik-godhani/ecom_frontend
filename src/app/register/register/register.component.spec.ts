import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RegisterData } from 'src/app/core/models/auth.models';
import { AuthService } from 'src/app/core/services/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatInputModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [ RegisterComponent ],
      providers: [AuthService,
        { provide: Router, useValue: {navigateByUrl: jasmine.createSpy("navigateByUrl")} }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with default values', () => {
    expect(component.registerForm.get("fname")?.value).toBe("");
    expect(component.registerForm.get("lname")?.value).toBe("");
    expect(component.registerForm.get("phone")?.value).toBe("");
    expect(component.registerForm.get("email")?.value).toBe("");
    expect(component.registerForm.get("password")?.value).toBe("");
  });

  it('should mark the form as touched and not call aythService.register when form is invalid', () => {
    spyOn(authService, "register").and.callThrough();
    const mockData = new RegisterData();
    mockData.fname = "John";
    mockData.lname = "Doe";
    mockData.phone = "1234567890";
    mockData.email = "johndoeexample.com";
    mockData.password = "password";

    component.registerForm.setValue(mockData);

    const registerButton = fixture.nativeElement.querySelector('button[id="registerFormSubmit"]');
    registerButton.click();
    expect(component.registerForm.touched).toBeTruthy();
    expect(authService.register).not.toHaveBeenCalled();
  })

  it('should check positive response', () => {
    const mockData = new RegisterData();
    mockData.fname = "John";
    mockData.lname = "Doe";
    mockData.phone = "1234567890";
    mockData.email = "johndoe@example.com";
    mockData.password = "password";
    spyOn(authService, "register").and.returnValue(of({status: "SUCCESS", message:""}));

    component.registerForm.setValue(mockData);

    const registerButton = fixture.nativeElement.querySelector('button[id="registerFormSubmit"]');
    registerButton.click();

    expect(authService.register).toHaveBeenCalledWith(mockData);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  })
});

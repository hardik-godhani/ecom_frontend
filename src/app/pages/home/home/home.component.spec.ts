import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ HomeComponent ],
      providers: [ UserService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should check for positive response', () => {
    const mockData: User[] = [{ id: 1, fname: 'John', lname: 'Doe', role: 'admin', phone: '12345678999', email: 'johndoe@example.com' }];
    spyOn(userService, "getUserList").and.returnValue(of({ status: "SUCCESS", data: mockData, message: "" }));
    component.getUserList();
    expect(component.users).toEqual(mockData);
    expect(userService.getUserList).toHaveBeenCalled();
  })

});

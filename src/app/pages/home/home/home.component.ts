import { User } from './../../../core/models/user.model';
import { APIResponse } from './../../../core/models/apiResponse.model';
import { UserService } from './../../../core/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ecom-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList().subscribe((res: APIResponse<User[]>) => {
      if (res.status == "SUCCESS" && res.data) {
        this.users = res.data; 
      } 
    })
  }
}

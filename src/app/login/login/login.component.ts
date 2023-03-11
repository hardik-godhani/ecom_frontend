import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ecom-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailFormControl = new FormControl('admin', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('pass', [Validators.required, Validators.minLength(6)]);
}

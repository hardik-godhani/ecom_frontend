import { User } from './../../core/models/user.model';
import { APIResponse } from './../../core/models/apiResponse.model';
import { LocalStoreService } from './../../core/services/local-store.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/core/models/auth.models';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ecom-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private localStore: LocalStoreService, private router: Router) { }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let loginData = new LoginData();
    loginData.email = this.loginForm.get('email')?.value;
    loginData.password = this.loginForm.get('password')?.value;

    this.authService.login(loginData).subscribe((res: APIResponse<User>) => {
      if (res.status == "SUCCESS" && res.data) {
        this.localStore.setUserData(res.data);
        this.router.navigateByUrl('');
      }
    })

  }
}

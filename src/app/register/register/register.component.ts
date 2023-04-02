import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/core/models/apiResponse.model';
import { RegisterData } from 'src/app/core/models/auth.models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'ecom-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = this.formBuilder.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }


  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    let registerData = new RegisterData();
    registerData.email = this.registerForm.get('email')?.value;
    registerData.password = this.registerForm.get('password')?.value;
    registerData.fname = this.registerForm.get('fname')?.value;
    registerData.lname = this.registerForm.get('lname')?.value;
    registerData.phone = this.registerForm.get('phone')?.value;

    this.authService.register(registerData).subscribe((res: APIResponse<null>) => {
      if (res.status == "SUCCESS") {
        this.router.navigateByUrl('/login');
      }
    })
  }
}

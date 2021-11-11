import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2'

import { LoginFormDataResponse } from '../../interfaces/login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private formSubmitted: boolean = false;
  private emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '' ,
      [Validators.required, Validators.pattern(this.emailPattern)]
    ],
    password: [ '', [Validators.required] ],
    rememberMe: [false]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpSrv: HttpService
  ) { }

  login(): void {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.httpSrv.loginUser(this.loginForm.value, this.loginForm.controls.rememberMe.value)
      .subscribe(
        (res: LoginFormDataResponse) => this.router.navigateByUrl('/'),
        (err) =>  Swal.fire('Error', err.error.msg, 'error')
      )


  }

  public invalidField(field: string): boolean {
    return this.formSubmitted && this.loginForm.get(field).invalid ? true : false;
  }

}

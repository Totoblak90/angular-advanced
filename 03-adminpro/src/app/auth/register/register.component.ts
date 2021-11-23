import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/users.service';
import Swal from 'sweetalert2'
import { RegisterFormDataResponse } from 'src/app/interfaces/register.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  private formSubmitted: boolean = false;
  private emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public registerForm = this.fb.group({
    nombre: [ '', Validators.required ],
    email: [ '', [Validators.required, Validators.pattern(this.emailPattern)] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ],
    password2: [ '', [Validators.required, Validators.minLength(6)] ],
    terms: [ false, Validators.required ],
  }, {
    validators: this.passwordMatchFormValidator('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) { }

  public createUser(): void {
    this.formSubmitted = true;

    if (!this.registerForm.valid) {
      return;
    }
    this.http.registerUser(this.registerForm.value)
      .subscribe(
        (res: RegisterFormDataResponse) => this.router.navigateByUrl('/'),
        err => Swal.fire('Error', err.error.msg, 'error')
      )
  }

  public invalidField(field: string): boolean {
    return this.formSubmitted && (this.registerForm.get(field).invalid || this.registerForm.get(field).value === false ) ? true : false;
  }

  public checkPasswordsMatch(): boolean {
    const password1 = this.registerForm.get('password').value;
    const password2 = this.registerForm.get('password2').value;

    return this.formSubmitted && (password1 !== password2);
  }

  private passwordMatchFormValidator(pass1: string, pass2: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notMatch: true });
      }
    }
  }

}

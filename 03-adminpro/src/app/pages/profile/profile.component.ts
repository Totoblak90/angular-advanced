import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  private emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public user: User;

  constructor(private fb: FormBuilder, private httpSrv: HttpService) {
    this.user = httpSrv.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  public editProfile() {

    if (this.profileForm.valid) {
      this.httpSrv
        .updateUser(this.profileForm.value)
        .subscribe((res) => {
          const { nombre, email } = this.profileForm.value
          this.user.name = nombre;
          this.user.email = email;
        });
    }
  }
}

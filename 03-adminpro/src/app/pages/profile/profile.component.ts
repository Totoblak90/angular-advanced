import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { HttpService } from '../../services/http.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  private emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public user: User;
  public imageToUpload: File;
  public imgTemp: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private httpSrv: HttpService,
    private fileUploadSrv: FileUploadService
  ) {
    this.user = httpSrv.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.user.name, Validators.required],
      email: [
        this.user.email,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
    });
  }

  public editProfile() {
    const { nombre, email } = this.profileForm.value;
    if (
      this.profileForm.valid &&
      (nombre !== this.user.name || email !== this.user.email)
    ) {
      this.updateUserInfo(nombre, email);
    }
  }

  private updateUserInfo(name: string, email: string): void {
    this.httpSrv.updateUser(this.profileForm.value).subscribe(
      (res) => {
        this.user.name = name;
        this.user.email = email;
        Swal.fire('Great!', 'Changes were succesfully made.', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  public saveImage(file: File): void {
    this.imageToUpload = file;

    if (!file) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  public updateUserImage(): void {
    this.fileUploadSrv
      .updateFile(this.imageToUpload, 'usuarios', this.user.uid)
      .then((img) => {
        this.user.img = img;
        Swal.fire('Great!', 'Image was succesfully uploaded', 'success')
      })
      .catch((err) => Swal.fire('Error', err.error.msg, 'error'));
  }
}

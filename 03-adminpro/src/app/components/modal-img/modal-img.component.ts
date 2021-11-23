import { Component, OnInit } from '@angular/core';
import { ModalImgService } from '../../services/modal-img.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css'],
})
export class ModalImgComponent {
  public imageToUpload: File;
  public imgTemp: string | ArrayBuffer;

  constructor(
    public modalImgSrv: ModalImgService,
    private fileUploadSrv: FileUploadService
  ) {}

  public closeModal() {
    this.imgTemp = null;
    this.modalImgSrv.deleteModal();
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

  public updateImage(): void {
    this.fileUploadSrv
      .updateFile(
        this.imageToUpload,
        this.modalImgSrv.type,
        this.modalImgSrv.id
      )
      .then((img) => {
        this.modalImgSrv.showUploadedImage.emit(img);
        this.closeModal();
        Swal.fire('Great!', 'Image was succesfully uploaded', 'success');
      })
      .catch((err) => Swal.fire('Error', err.error.msg, 'error'));
  }
}

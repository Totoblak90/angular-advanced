import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModalImgService {
  private _deleteModal: boolean = true;
  public type: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;
  public showUploadedImage: EventEmitter<string> = new EventEmitter();

  public get getModalProperty(): boolean {
    return this._deleteModal;
  }

  constructor() {}

  public showModal(
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-image'
  ): void {
    this._deleteModal = false;
    this.type = type;
    this.id = id;
    this.img = `${environment.apiBaseUrl}/upload/${type}/${img}`;
  }

  public deleteModal(): void {
    this._deleteModal = true;
  }
}

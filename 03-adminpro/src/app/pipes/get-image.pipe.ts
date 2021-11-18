import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'getImage'
})
export class GetImagePipe implements PipeTransform {

  private apiBaseUrl: string = environment.apiBaseUrl

  transform(img: string, type: 'usuarios'|'hospitales'|'medicos'): string {

    switch (img) {
      case null || undefined:
        return `${this.apiBaseUrl}/upload/${type}/no-img`
      default:
        return `${this.apiBaseUrl}/upload/${type}/${img}`
    }

  }

}

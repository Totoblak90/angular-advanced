import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private base_api_url: string = environment.apiBaseUrl;

  constructor() { }

  public async updateFile(
    file: File,
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {

    try {

      const url: string = `${ this.base_api_url }/upload/${ type }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })

      const data = await resp.json();

      if (!data.ok) {
        return false;
      }

      return data.nombreArchivo;

    } catch (error) {
      console.log(error)
      return;
    }


  }
}

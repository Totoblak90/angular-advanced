import { environment } from '../../environments/environment.prod';

const base_url = environment.apiBaseUrl

export class User {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ) {}

  public get imageUrl(): string {
    if (!this.img) {return `${base_url}/upload/usuarios/no-image`}
    else {return `${base_url}/upload/usuarios/${this.img}`}
  }
}

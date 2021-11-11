import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public imageUrl: string = '';
  public email: string = '';
  public name: string = '';

  constructor( private http: HttpService) {
    this.imageUrl = http.usuario.imageUrl;
    this.email = http.usuario.email;
    this.name = http.usuario.name;
  }

  public logout() {
    this.http.logout();
  }

}

import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: User;

  constructor( private http: HttpService) {
    this.usuario = http.usuario;
  }

  public logout() {
    this.http.logout();
  }

}

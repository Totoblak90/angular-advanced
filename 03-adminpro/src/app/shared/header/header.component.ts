import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { HttpService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario: User;

  constructor( private http: HttpService, private router: Router) {
    this.usuario = http.usuario;
  }

  public logout() {
    this.http.logout();
  }

  public search(term: string) {
    this.router.navigateByUrl(`/dashboard/search/${term}`)
  }

}

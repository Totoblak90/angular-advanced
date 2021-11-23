import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { HttpService } from '../../services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public user: User;

  constructor(
    public sidebarSrv: SidebarService,
    private http: HttpService
  ) {

    this.user = http.usuario;
  }

  public logout(): void {
    this.http.logout();
  }
}

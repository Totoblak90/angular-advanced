import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public menu: any[];
  public imageUrl: string = ''
  public name: string = '';
  public email: string = '';

  constructor(
    private sidebarSrv: SidebarService,
    private http: HttpService
  ) {
    this.menu = this.sidebarSrv.menu;
    this.imageUrl = http.usuario?.imageUrl;
    this.name = http.usuario?.name;
    this.email = http.usuario?.email;
  }

  public logout(): void {
    this.http.logout();
  }
}

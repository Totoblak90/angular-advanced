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

  constructor(
    private sidebarSrv: SidebarService,
    private http: HttpService
  ) {
    this.menu = this.sidebarSrv.menu;
  }

  public logout(): void {
    this.http.logout();
  }
}

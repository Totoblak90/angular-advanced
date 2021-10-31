import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menu: any[];

  constructor(private sidebarSrv: SidebarService) {
    this.menu = this.sidebarSrv.menu;
  }

  ngOnInit(): void {
  }

}

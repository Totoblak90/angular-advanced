import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function initScriptFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private settingsSrv: SettingsService, private sidebarServ: SidebarService) { }

  ngOnInit(): void {
    initScriptFunctions();
    this.sidebarServ.getSidebarMenu();
  }

}

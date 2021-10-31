import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingsSrv: SettingsService) { }

  ngOnInit(): void {
    this.settingsSrv.setSelectedTheme();
  }

  public changeTheme( theme: string ) {
    this.settingsSrv.changeTheme( theme);
  }


}

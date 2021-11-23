import { Injectable } from '@angular/core';
import { SideBarMenu } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: SideBarMenu[] = [];

  public getSidebarMenu(): void {
    const menuLocalStorage: string = localStorage.getItem('menu');
    this.menu = JSON.parse(menuLocalStorage);
    this.menu.forEach( menuItem => {
      menuItem.quantity = menuItem.subMenu.length;
      menuItem.subMenu.sort( (a, b) => {
        if (a.title < b.title) {
          return -1
        } else if ( a.title > b.title) {
          return 1
        }
        return 0
      })
    })
  }
}

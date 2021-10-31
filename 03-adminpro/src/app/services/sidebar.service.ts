import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      quantity: null,
      subMenu: [
        { title: 'Home', url: '/' },
        { title: 'Progress-bar', url: '/dashboard/progress'},
        { title: 'Graphics', url: '/dashboard/graphic1'}
      ]
    }
  ]
  constructor() { 
    this.menu.forEach( menuItem => {
      menuItem.quantity = menuItem.subMenu.length;
    })
  }
}

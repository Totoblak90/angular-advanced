import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      quantity: null,
      subMenu: [
        { title: 'Home', url: '/' },
        { title: 'Progress-bar', url: '/dashboard/progress'},
        { title: 'Graphics', url: '/dashboard/graphic1'},
        { title: 'Promises', url: '/dashboard/promises' },
        { title: 'Observables', url: '/dashboard/observables' }
      ]
    }
  ]

  constructor() {
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

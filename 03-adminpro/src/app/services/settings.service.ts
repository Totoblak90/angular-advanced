import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private themeLink = document.getElementById('theme')

  constructor() { 
    const selectedTheme = 
    localStorage.getItem('theme') 
    || './assets/css/colors/default-dark.css';
    
    this.themeLink.setAttribute('href', selectedTheme);
  }

  public changeTheme( theme: string ) {
    const url = `/assets/css/colors/${ theme }.css`
    this.themeLink.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.setSelectedTheme();
  }

  public setSelectedTheme(): void {
    const links = document.querySelectorAll('.selector');

    links.forEach( elem => {
      elem.classList.remove('working');
      const themeName = elem.getAttribute('data-theme');
      const url = `/assets/css/colors/${ themeName }.css`
      const actualTheme = this.themeLink.getAttribute('href');

      if (actualTheme === url) {
        elem.classList.add('working')
      }

    })
  }
}

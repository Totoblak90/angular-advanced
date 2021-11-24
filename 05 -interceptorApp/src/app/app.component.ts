import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'interceptorApp';

  constructor(private userService: UsersService) {
    this.userService.getUsers().subscribe(
      (res) => console.log(res),
    );
    this.userService.getUsersWithError().subscribe();
  }
}

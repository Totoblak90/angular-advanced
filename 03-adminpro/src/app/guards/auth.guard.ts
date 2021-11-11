import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private http: HttpService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.http.validateToken()
        .pipe(
          tap( (userIsAuthenticated) => {
            if (!userIsAuthenticated) {
              this.router.navigateByUrl('/auth/login');
              Swal.fire('Error', 'User must be logged in to enter the dashboard', 'error')
            }
          } )
        )
  }

}

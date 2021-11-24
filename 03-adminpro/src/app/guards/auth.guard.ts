import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/users.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private http: HttpService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.http.validateToken().pipe(
      tap((userIsAuthenticated) => {
        if (!userIsAuthenticated) {
          this.router.navigateByUrl('/auth/login');
          Swal.fire(
            'Error',
            'User must be logged in to enter the dashboard',
            'error'
          );
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.http.validateToken().pipe(
      tap((userIsAuthenticated) => {
        if (!userIsAuthenticated) {
          this.router.navigateByUrl('/auth/login');
          Swal.fire(
            'Error',
            'User must be logged in to enter the dashboard',
            'error'
          );
        }
      })
    );
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public title: string;
  private titleSuscription$: Subscription;

  constructor(private router: Router) {
   this.titleSuscription$ = this.getRouterParams();
  }


  ngOnInit(): void {
  }

  private getRouterParams(): Subscription {
    return this.router.events
            .pipe(
              filter( value => value instanceof ActivationEnd ),
              filter( (value: ActivationEnd) => value.snapshot.firstChild === null),
              map((value: ActivationEnd) => value.snapshot.data)
            )
            .subscribe(
              (value: Data) => {
                this.title = value.title;
                document.title = `AdminPro - ${value.title}`
              }
            )
  }

  ngOnDestroy(): void {
    this.titleSuscription$.unsubscribe();
  }

}

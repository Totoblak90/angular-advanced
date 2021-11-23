import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  UserSearchRes,
  DoctorHospitalSearchRes,
} from '../../interfaces/search';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css'],
})
export class SearchTableComponent implements OnInit, OnDestroy {
  @Input() public users?: UserSearchRes[] = [];
  @Input() public doctors?: DoctorHospitalSearchRes[] = [];
  @Input() public hospitals?: DoctorHospitalSearchRes[] = [];
  public results: UserSearchRes[] | DoctorHospitalSearchRes[] = [];
  public title: string;
  private destroy$: Subject<boolean> = new Subject();

  constructor() {}

  ngOnInit(): void {
    new Observable((observer) => {
      this.mapResults();
      this.createArrayForHtml();
      observer.next(this.results)
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private mapResults(): void {
    this.users?.forEach((user, index: number) => {
      user.numberId = index + 1;
      user.type = 'usuarios'
      user.redirect = '/dashboard/users'
    });
    this.doctors?.forEach((doctor, index) => {
      doctor.numberId = index + 1;
      doctor.type = 'medicos'
      doctor.redirect = `/dashboard/doctors`
    });
    this.hospitals?.forEach((hospital, index) => {
      hospital.numberId = index + 1;
      hospital.type = 'hospitales'
      hospital.redirect = '/dashboard/hospitals'
    });
  }

  private createArrayForHtml(): void {
    if (this.users?.length) {
      this.title = 'Users'
      this.results = this.users;
    } else if ( this.doctors?.length ) {
      this.title = 'Doctors'
      this.results = this.doctors;
    } else if (this.hospitals?.length) {
      this.title = 'Hospitals'
      this.results = this.hospitals;
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

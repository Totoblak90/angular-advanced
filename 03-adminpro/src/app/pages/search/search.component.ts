import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import {
  UserSearchRes,
  DoctorHospitalSearchRes,
  SearchAll,
} from '../../interfaces/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public usersResults: UserSearchRes[] = [];
  public hospitalsResults: DoctorHospitalSearchRes[] = [];
  public doctorsResults: DoctorHospitalSearchRes[] = [];
  public searchTerm: string;
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchSrv: SearchService
  ) {
    this.getSearchTerm();
  }

  ngOnInit(): void {}

  private getSearchTerm(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.searchTerm = res.get('term');
        if (this.searchTerm === '') {
          this.router.navigateByUrl('/');
        } else {
          this.setSearchResults();
        }
      });
  }

  private setSearchResults(): void {
    this.searchSrv
    .searchAll(this.searchTerm)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: SearchAll) => {
      this.usersResults = res.usuarios;
      this.doctorsResults = res.medicos;
      this.hospitalsResults = res.hospitales;

    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

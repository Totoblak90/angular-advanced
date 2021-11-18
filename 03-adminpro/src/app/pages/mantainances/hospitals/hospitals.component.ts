import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { GetHospitalsResponse, Hospitale } from '../../../interfaces/hospitals';
import Swal from 'sweetalert2';
import { SearchService } from '../../../services/search.service';
import { Search } from 'src/app/interfaces/search';
import { ModalImgService } from '../../../services/modal-img.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospitale[] = [];
  public loading: boolean = true;
  public searchingResults: number;
  public searching: boolean = false;
  private imgSubscription: Subscription;

  constructor(
    private modalImgSrv: ModalImgService,
    private hospitalsSrv: HospitalService,
    private search: SearchService
  ) {}


  ngOnInit(): void {
    this.getHospitals();
    this.imgSubscription = this.modalImgSrv.showUploadedImage
    .pipe(delay(500))
    .subscribe((img) => this.getHospitals());
  }

  public searchHospitals(term: string): void {
    this.searching = true;
    if (!term) {
      this.getHospitals();
      this.searching = false;
      return;
    }
    this.search.search('hospitales', term).subscribe((res: Search) => {
      this.hospitals = res?.resultados as Hospitale[];
      this.searchingResults = res?.resultados?.length;
    });
  }

  private getHospitals(): void {
    this.loading = true;
    this.hospitalsSrv.getAllHospitals().subscribe((response: Hospitale[]) => {
      this.hospitals = response;
      this.loading = false;
    });
  }

  public createHospital(hospitalName: string): void {
    this.hospitalsSrv.createHospital(hospitalName).subscribe((res) => {
      this.getHospitals();
    });
  }

  public editHospital(newHospitalName, hospitalId): void {
    Swal.fire({
      title: 'Save changes?',
      showDenyButton: true,
      confirmButtonText: 'Yes!',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveEditedHospital(newHospitalName, hospitalId);
      } else if (result.isDenied) {
        this.getHospitals();
      }
    });
  }

  private saveEditedHospital(
    newHospitalName: string,
    hospitalId: string
  ): void {
    this.hospitalsSrv
      .editHospital(newHospitalName, hospitalId)
      .subscribe((res) => {
        this.getHospitals();
      });
  }

  public deleteHospital(hospitalId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete the hospital?',
      showDenyButton: true,
      confirmButtonText: 'Yes!',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalsSrv
          .deleteHospital(hospitalId)
          .subscribe(() => this.getHospitals());
      }
    });
  }

  public openModal(hospital: Hospitale): void {
    this.modalImgSrv.showModal('hospitales', hospital._id, hospital.img);
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe()
  }
}

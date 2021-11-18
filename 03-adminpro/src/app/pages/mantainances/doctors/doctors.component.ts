import { Component, OnInit, OnDestroy } from '@angular/core';
import { Search } from 'src/app/interfaces/search';
import { Doctor } from '../../../interfaces/doctors';
import { SearchService } from '../../../services/search.service';
import { DoctorService } from '../../../services/doctor.service';
import { ModalImgService } from '../../../services/modal-img.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public doctors: Doctor[] = [];
  public searching: boolean;
  public searchingResults: number;
  public loading: boolean = false;
  private imgSubscription: Subscription;

  constructor(
    private search: SearchService,
    private doctorsSrv: DoctorService,
    private modalImgSrv: ModalImgService,
    private hospitalSrv: HospitalService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.imgSubscription = this.modalImgSrv.showUploadedImage
      .pipe(delay(500))
      .subscribe((img) => this.getDoctors());
  }

  public searchDoctors(term: string): void {
    this.searching = true;
    if (!term) {
      this.getDoctors();
      this.searching = false;
      return;
    }
    this.search.search('medicos', term).subscribe((res: Search) => {
      this.doctors = res?.resultados as Doctor[];
      this.searchingResults = res?.resultados?.length;
    });
  }

  private getDoctors(): void {
    this.loading = true;
    this.doctorsSrv.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.loading = false;
    });
  }

  public async createOrEditDoctor(
    action: string,
    doctorId?: string,
    doctorName?: string
  ): Promise<void> {

    const { value } = await Swal.fire({
      title: this.setAlertTitle(action),
      text: 'Write down the doctors name',
      input: 'text',
      inputValue: doctorName ? doctorName : '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });

    if (value) {
      this.selectHospital(value, action, doctorId);
    }
  }

  private setAlertTitle(action: string): string {

    let title: string;

    switch (action) {
      case 'create':
        title = 'Create a doctor';
        break;
      case 'edit':
        title = 'Edit a doctor';
        break;
    }
    return title
  }

  private async selectHospital(
    doctorName: string,
    action: string,
    doctorId: string
  ): Promise<void> {
    const items = await this.getSelectProperties();

    const { value } = await Swal.fire({
      title: this.setAlertTitle(action),
      input: 'select',
      inputOptions: items,
      inputPlaceholder: 'Select Hospital',
      showCancelButton: true,
      inputValidator: (result) => !result && 'You need to select something!',
    });

    if (value) {
      switch (action) {
        case 'create':
          this.createDoctor(doctorName, value);
          break;
        case 'edit':
          this.editDoctor(doctorName, value, doctorId);
          break;
      }
    }
  }

  private createDoctor(doctorName: string, hospitalId: string) {
    this.doctorsSrv.createDoctor(doctorName, hospitalId).subscribe((res) => {
      this.getDoctors();
    });
  }

  private editDoctor(doctorName: string, hospitalId: string, doctorId: string) {
    this.doctorsSrv
      .editDoctor(doctorName, hospitalId, doctorId)
      .subscribe((res) => {
        this.getDoctors();
      });
  }

  private getSelectProperties(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.hospitalSrv.getAllHospitals().subscribe((hospitals) => {
        let obj = {};
        for (let i = 0; i < hospitals.length; i++) {
          obj[hospitals[i]._id] = hospitals[i].nombre;
        }
        if (obj) {
          resolve(obj);
        } else {
          reject()
        }
      });
    });
  }

  public deleteDoctor(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorsSrv.deleteDoctor(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Doctor has been deleted', 'success');
          this.getDoctors();
        });
      }
    });
  }

  public openModal(doctor: Doctor): void {
    this.modalImgSrv.showModal('medicos', doctor._id, doctor.img);
  }

  ngOnDestroy(): void {
    this.imgSubscription.unsubscribe();
  }
}

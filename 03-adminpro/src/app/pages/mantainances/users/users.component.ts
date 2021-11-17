import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpService } from '../../../services/users.service';
import { GetAllUsersResponse } from '../../../interfaces/all-users.interface';
import { delay, finalize } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';
import { Search } from 'src/app/interfaces/search';
import Swal from 'sweetalert2';
import { UpdateUserResponseFromAdminPanel } from 'src/app/interfaces/update-user.interface';
import { ModalImgService } from '../../../services/modal-img.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  private from: number = 0;
  public loading: boolean = true;
  public pagination: number;
  public searching: boolean = false;
  public searchingResults: number = 0;
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private modalImgSrv: ModalImgService,
    private usersSrv: HttpService,
    private search: SearchService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.modalImgSrv.showUploadedImage
      .pipe(delay(500))
      .subscribe((img) => this.loadUsers());
  }

  public loadUsers(): void {
    this.loading = true;
    this.usersSrv
      .getAllUsers(this.from)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res: GetAllUsersResponse) => {
        this.searchingResults = 0;
        this.totalUsers = res?.total;
        this.users = res?.usuarios;
        this.pagination = this.users.length;
      });
  }

  changePage(value: number): void {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }

    this.loadUsers();
  }

  public searchUsers(term: string): void {
    this.searching = true;
    if (!term) {
      this.loadUsers();
      this.searching = false;
      return;
    }
    this.search.search('usuarios', term).subscribe((res: Search) => {
      this.users = res?.resultados;
      this.searchingResults = res?.resultados?.length;
    });
  }

  public deleteUser(user: User): void {
    if (user.uid === this.usersSrv.usuario.uid) {
      Swal.fire('Error', 'You can t delete yourself', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete user: ${user.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersSrv.deleteUser(user.uid).subscribe(() => {
          this.showConfirmationOfDelete(user.nombre);
        });
      }
    });
  }

  private showConfirmationOfDelete(name: string): void {
    Swal.fire({
      title: 'Deleted',
      text: `User ${name} has been succesfully deleted`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadUsers();
      }
    });
  }

  changeRole(user: User) {
    this.usersSrv.updateUserFromAdminPanel(user).subscribe(
      (res: UpdateUserResponseFromAdminPanel) => null,
      (err) => Swal.fire('Error', 'Could not update the user', 'error')
    );
  }

  public openModal(user: User): void {
    this.modalImgSrv.showModal('usuarios', user.uid, user.img);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

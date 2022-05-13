import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfficeService } from '../../../service/office.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User, UserService } from 'src/app/service/user.service';

export interface Usuarios {
  id: number;
  name: string;
  username?: string;
  password?: string;
  email?: string;
  mobile?: string;
  role_id?: number;
}

export interface SelectedUsers {
  id: number;
  name: string;
}

const ELEMENT_DATA: SelectedUsers[] = [
  {id: 1, name: 'Joao'},
  {id: 2, name: 'Jose'},
]
@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css'],
})

export class AddOfficeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  dataSource = ELEMENT_DATA;

  myControl = new FormControl();
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;
  @Input() officeObj = { nome: '', abreviatura: '', descricao: '', chefe_id: 0 };

  constructor(
    public dialog: MatDialog,
    public officeService: OfficeService,
    public router: Router
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  openDialogUsuarios() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    (dialogConfig.height = '50%'), (dialogConfig.width = '50%');

    const dialogRef = this.dialog.open(ModalUsuariosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addOffice(data: any) {
    this.officeService.addOffice(this.officeObj).subscribe((data: {}) => {
      this.router.navigate(['/office/list']);
    });
  }
}


@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
})

export class ModalUsuariosComponent {

  Users: any = [];

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<ModalUsuariosComponent>
    ) {}
  
  ngOnInit() {
    this.fetchUsers();
  }

  onCloseUsuarios(): void {
    this.dialogRef.close();
  }
  fetchUsers() {
    return this.userService.getUsers().subscribe((res: {}) => {
      this.Users = res;
      setTimeout(() => {
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    },
    (error) => console.error(error)
    );
  }
}
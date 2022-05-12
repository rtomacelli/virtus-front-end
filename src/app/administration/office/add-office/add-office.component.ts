import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfficeService } from '../../../service/office.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';

export interface Usuarios {
  id: number;
  name: string;
  username?: string;
  password?: string;
  email?: string;
  mobile?: string;
  role_id?: number;
}

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css'],
})

export class AddOfficeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Ricardo', 'Roberto', 'Ronaldo'];
  filteredOptions: Observable<string[]>;

  @Input() officeObj = {
    nome: '',
    abreviatura: '',
    descricao: '',
    chefe_id: 0,
  };

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  constructor(
    public dialog: MatDialog,
    public officeService: OfficeService,
    public router: Router
  ) {}

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
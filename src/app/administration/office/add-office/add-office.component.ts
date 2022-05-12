import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { OfficeService } from '../../../service/office.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css'],
})

export class AddOfficeComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Ricardo', 'Roberto', 'Ronaldo'];
  filteredOptions: Observable<string[]>;

  @Input() officeObj = {nome: '', abreviatura: '', descricao: '', chefe_id: 0};

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
  ) { }

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

  Usuarios: any = [];

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<ModalUsuariosComponent>
  ) { }

  ngOnInit() {
    this.Usuarios = this.userService.getUsers();
  }

  onCloseUsuarios(): void {
    this.dialogRef.close();
  }

}
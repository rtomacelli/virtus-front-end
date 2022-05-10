import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfficeService } from "../../../service/office.service";
import { ListUserComponent } from '../../user/list-user/list-user.component';


export interface Usuarios {
  id: number;
  name: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
];

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css']
})

export class AddOfficeComponent implements OnInit {
  
  @Input() officeObj = { nome: '', abreviatura: '', descricao: '', chefe_id: 0}
  
  users: Usuarios[] = [
    {id: 1, name: 'Joao'},
    {id: 2, name: 'Jose'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialog: MatDialog,
    public officeService: OfficeService, 
    public router: Router
  ) { }

  openDialogUsuarios() {

    const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.id = "modal-component";
          dialogConfig.height = "50%",
          dialogConfig.width = "50%"

    const dialogRef = this.dialog.open( ModalUsuariosComponent , dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openDialogChefe() {

    const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.id = "modal-component";
          dialogConfig.height = "50%",
          dialogConfig.width = "50%"

    const dialogRef = this.dialog.open(  ModalchefeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  ngOnInit(): void { }
  
  addOffice(data: any) {
    this.officeService.addOffice(this.officeObj).subscribe((data: {}) => {
      this.router.navigate(['/office/list'])
  })
  }
}

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
})
export class ModalUsuariosComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios,
  ) {}

  onCloseUsuarios(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-modal-chefe',
  templateUrl: './modal-chefe.component.html',
})
export class ModalchefeComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalchefeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuarios,
  ) {}

  onCloseChefe(): void {
    this.dialogRef.close();
  }
}

//https://material.angular.io/components/dialog/overview
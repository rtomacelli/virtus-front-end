import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfficeService } from "../../../service/office.service";
import { ListUserComponent } from '../../user/list-user/list-user.component';

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css']
})

export class AddOfficeComponent implements OnInit {

@Input() officeObj = { nome: '', abreviatura: '', descricao: '', chefe_id: 0}

  constructor(
    public dialog: MatDialog,
    public officeService: OfficeService, 
    public router: Router
  ) { }

  openDialog() {

    const dialogRef = this.dialog.open(ListUserComponent,{
      width: '50%',
      height: '50%',
    });

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

export class DialogContentExampleDialog {}
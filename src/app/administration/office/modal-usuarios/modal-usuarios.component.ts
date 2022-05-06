import { Component, OnInit } from '@angular/core';
import { AddOfficeComponent } from '../add-office/add-office.component'

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.css']
})
export class ModalUsuariosComponent implements OnInit {

  constructor(
      public addofficecomponent: AddOfficeComponent 
    ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.addofficecomponent.dialog.closeAll();
  }

}

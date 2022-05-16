import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfficeService } from '../../../service/office.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User, UserService } from 'src/app/service/user.service';

export interface Chefes {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css'],
})

export class AddOfficeComponent implements OnInit {

  chefes: any [];
  Users: any = [];
  displayedColumns: string[] = ['id', 'name'];
  options: Chefes[] = [{id: 0, name: 'Mary'}, {id: 1, name: 'Maria'}, {id: 2, name: 'Mario'}, {id: 3, name: 'Marcelo'}, {id: 4, name: 'Shelley'}, {id: 5, name: 'Shannon'}, {id: 6, name: 'Igor'}];
  
  myControl = new FormControl();
  filteredOptions: Observable<Chefes[]>;
  @Input() officeObj = { nome: '', abreviatura: '', descricao: '', chefe_id: 0 };

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public userService: UserService,
    public officeService: OfficeService,
  ) {}

  ngOnInit() {

    this.Users = this.userService.getUsers();
//  this.options = this.Users.stringObject;
//    delete this.Users.username;
//    delete this.Users.password;
//    delete this.Users.email;
//    delete this.Users.mobile;
//    delete this.Users.role_id;


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(chefes: Chefes): string {
    if(chefes){
    let nomeUsuario = chefes ? chefes.name : '';
    console.log(nomeUsuario);
    };
    return chefes && chefes.name ? chefes.name : '';
  }

  private _filter(name: string): Chefes[] {
    const filterValue = name.toLowerCase();
    this.officeObj.chefe_id = this.options.find(option => option.name.toLowerCase().includes(filterValue)).id;
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addOffice(data: any) {
    this.officeService.addOffice(this.officeObj).subscribe((data: {}) => {
      this.router.navigate(['/office/list']);
    });
  }
}
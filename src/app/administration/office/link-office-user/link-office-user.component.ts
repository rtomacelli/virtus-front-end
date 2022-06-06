import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';

export interface User {
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-link-office-user',
  templateUrl: './link-office-user.component.html',
  styleUrls: ['./link-office-user.component.css']
})
export class LinkOfficeUserComponent implements OnInit {

  dsUsuariosSgbd: any;
  dsUsuariosForm: any;
  displayedColumns:  string[] = ['nome', 'telefone', 'acao'];
  //dsUsuarios = new MatTableDataSource(this.dsUsuariosDB);

  constructor(
    public userService: UserService,
  ) {}

  ngOnInit() {

    this.userService.getUsers().subscribe(response => {
        this.dsUsuariosForm = new MatTableDataSource(response as Array<User>);
      });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filtro -> ' + filterValue);
    this.dsUsuariosSgbd.filter = filterValue.trim().toLowerCase();
  }

  resetSelected(){
    this.dsUsuariosForm = [];
  }

  incluir(usuarioSgbd) {
    this.dsUsuariosForm.push(usuarioSgbd);
  }

}



import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import {UserService} from 'src/app/service/user.service';

export interface User {
  id: number;
  nome: string;
  telefone: string;
}

const ELEMENT_DATA_DB: User[] = [
  {'id': 1,'nome': 'Huguetti Macedo','telefone': '(40) 8303-5352'},
  {'id': 2,'nome': 'Faiçal Costa','telefone': '(13) 4259-4344'},
  {'id': 3,'nome': 'Viviani Barros','telefone': '+55 (57) 0676-2718'},
  {'id': 4,'nome': 'Evertom Oliveira','telefone': '(12) 1000-5944'},
  {'id': 5,'nome': 'Eini Albuquerque Jr.','telefone': '(15) 5073-1736'},
  {'id': 6,'nome': 'Grécia Carvalho','telefone': '(49) 91870-9394'},
  {'id': 7,'nome': 'Cleverton Albuquerque','telefone': '(07) 2544-2622'},
  {'id': 8,'nome': 'Plinio Franco','telefone': '(18) 7080-9370'},
  {'id': 9,'nome': 'Flávia Macedo','telefone': '(21) 2179-5771'},
  {'id': 10,'nome': 'Fabricio Costa','telefone': '(56) 29446-2120'},
  {'id': 11,'nome': 'Leonildo Barros','telefone': '(40) 8303-5352'},
  {'id': 12,'nome': 'Mercedes Braga','telefone': '(13) 4259-4344'},
  {'id': 13,'nome': 'Ermenson Costa','telefone': '+55 (57) 0676-2718'},
  {'id': 14,'nome': 'Evertom Oliveira','telefone': '(12) 1000-5944'},
  {'id': 15,'nome': 'Vivian Silva Filho','telefone': '(15) 5073-1736'},
  {'id': 16,'nome': 'Santo Melo Jr.','telefone': '(49) 91870-9394'},
  {'id': 17,'nome': 'Juscelino Batista Jr.','telefone': '(07) 2544-2622'},
  {'id': 18,'nome': 'Alex Barros','telefone': '(18) 7080-9370'},
  {'id': 19,'nome': 'Srta. Lea Reis','telefone': '(21) 2179-5771'},
  {'id': 20,'nome': 'Mozart Nogueira','telefone': '(56) 29446-2120'},
  {'id': 21,'nome': 'Edelson Barros','telefone': '(40) 8303-5352'},
  {'id': 22,'nome': 'Edimilson Pereira Neto','telefone': '(13) 4259-4344'},
  {'id': 23,'nome': 'Giuma Silva','telefone': '+55 (57) 0676-2718'},
  {'id': 24,'nome': 'Emir Nogueira','telefone': '(12) 1000-5944'},
  {'id': 25,'nome': 'Eini Albuquerque Jr.','telefone': '(15) 5073-1736'},
  {'id': 26,'nome': 'Silvério Saraiva','telefone': '(49) 91870-9394'},
  {'id': 27,'nome': 'Cleverton Albuquerque','telefone': '(07) 2544-2622'},
  {'id': 28,'nome': 'Esequiel Moraes','telefone': '(18) 7080-9370'},
  {'id': 29,'nome': 'Valéria Reis','telefone': '(21) 2179-5771'},
  {'id': 30,'nome': 'Sra. Gildete Carvalho','telefone': '(56) 29446-2120'}
];

var ELEMENT_DATA_FORM: User[] = [];

@Component({
  selector: 'app-link-office-user',
  templateUrl: './link-office-user.component.html',
  styleUrls: ['./link-office-user.component.css']
})

export class LinkOfficeUserComponent {

  displayedColumns:  string[] = ['nome', 'telefone', 'acao'];
  datasource  = new MatTableDataSource(ELEMENT_DATA_DB);

  columnsToDisplay:  string[] = ['nome', 'telefone', 'acao'];
  datasource2  = new MatTableDataSource(ELEMENT_DATA_FORM);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  constructor(
    public userService: UserService
    ) {}
  
    ngAfterViewInit() {
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }

  applyFilter(event: Event) {
    console.log(this.datasource.filter);
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  resetSelected(){
    this.datasource2.data = [];
  }

  incluir(usuarioForm) {
    let data = this.datasource2.data; data.push(usuarioForm);
    this.datasource2.data = data;
    this.table.renderRows();
  }

  remover(element: User) {
    this.datasource2.data = this.datasource2.data.filter(item => item.nome !== element.nome);
  }

  atualizaCombo(datasource2) {
    console.log(datasource2.data);
  }

}
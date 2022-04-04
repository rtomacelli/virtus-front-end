import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

  export class ListUserComponent implements OnInit {

    label:  string[] = ['Username',  'Email', 'Telefone', 'Nome', 'Papel',   'Autor',     'Criado em']
    cols:   string[] = ['username',  'email', 'mobile',   'name', 'role_id', 'author_id', 'criado_em']
    displayedColumns: string[] = ['username',  'email', 'mobile', 'name', 'role_id', 'author_id', 'criado_em']
    Users: any = [];

    pgIndex= 1;
    flb = true;
    pnDisabled= true;
    hdPageSize= true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public userService: UserService) {}

    ngOnInit() {
      this.Users.paginator = this.paginator;
      this.Users.sort = this.sort;
      this.fetchUsers();
    }

    fetchUsers() {
      return this.userService.getUsers().subscribe((res: {}) => {
        this.Users = res;
      });
    }

    delete(id: any) {
      if (window.confirm('Deseja realmente excluir este usuário?')) {
        this.userService.deleteUser(id).subscribe((res) => {
          this.fetchUsers();
        });
      }
    }

    onChangePage(pe:PageEvent) {
      console.log(pe.pageIndex);
      console.log(pe.pageSize);
    }

  }
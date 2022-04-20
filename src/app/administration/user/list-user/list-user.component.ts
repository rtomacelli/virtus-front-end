import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from "../../../service/user.service";
import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

  export class ListUserComponent implements OnInit {

    label:  string[] = ['Username',  'Email', 'Telefone', 'Nome', 'Papel',]
    cols:   string[] = ['username',  'email', 'mobile',   'name', 'role_id',]
    displayedColumns: string[] = ['username',  'email', 'mobile', 'name', 'role_id']
    Users: any = [];

    constructor(public userService: UserService) {}

    ngOnInit() {
      this.fetchUsers()
    }

    ngAfterViewInit() {}

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

    }

  }
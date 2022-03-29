import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../service/user.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

  export class ListUserComponent implements OnInit {

    Users: any = [];
    constructor(public userService: UserService) {}

    ngOnInit() {
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
  }
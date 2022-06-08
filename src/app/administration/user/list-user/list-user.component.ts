import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

  export class ListUserComponent implements OnInit {

    Users: any = [];

    constructor(
      public userService: UserService
      ) {}
    
    ngOnInit() {
      this.fetchUsers();
    }

    fetchUsers() {
      return this.userService.getUsers().subscribe((res: {}) => {
        this.Users = res;
        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
          });
        }, 1);
      },
      (error) => console.error(error)
      );
    }
  
    delete(usuario: any) {
      if (window.confirm('Deseja realmente excluir o usuário ' + usuario.nome + ' ?')) {
        this.userService.deleteUser(usuario.id).subscribe((res) => {
          this.fetchUsers();
        });
      }
    }

  }
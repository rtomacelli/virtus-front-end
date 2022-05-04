import { HttpClient } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css'],
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

export class ListRoleComponent implements OnInit {

  Roles: any = [];

  constructor(public roleService: RoleService) {}
  
  ngOnInit() {
    this.fetchRole();
  }


  fetchRole() {
    return this.roleService.getRoles().subscribe((res: {}) => {
      this.Roles = res;
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

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.roleService.deleteRole(id).subscribe((res) => {
        this.fetchRole();
      });
    }
  }
}

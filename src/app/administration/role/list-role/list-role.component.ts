import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

  label:  string[] = ['ID', 'Papel', 'Descrição']
  cols:   string[] = ['id', 'name', 'description']
  displayedColumns: string[] = ['id', 'name', 'description'];

  Roles: any = [];

  constructor(public roleService: RoleService) {}
  
  ngOnInit() {
    this.fetchRole();
  }

  fetchRole() {
    return this.roleService.getRoles().subscribe((res: {}) => {
      this.Roles = res;
    });
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.roleService.deleteRole(id).subscribe((res) => {
        this.fetchRole();
      });
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from "../../../service/role.service";

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})

export class EditRoleComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  roleObj: any = {};

  constructor(
    public roleService: RoleService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.roleService.getSingleRole(this.id).subscribe((res: {}) => {
      this.roleObj = res;
    });
  }

  updateRole(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.roleService.updateRole(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }

}

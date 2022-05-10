import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from "../../../service/role.service";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  @Input() roleObj = {id: '', name: '', description: ''}

  constructor(
    public roleService: RoleService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addRole(data: any) {
    this.roleService.addRole(this.roleObj).subscribe((data: {}) => {
      this.router.navigate(['/role/list'])
    })
  }

}

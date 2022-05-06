import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../../service/user.service";
import { RoleService } from "../../../service/role.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  @Input() usuario = { username: '', password: '', email: '', mobile: '', name: '', role_id: 0}
  Roles: any = [];

  constructor(
    public userService: UserService, 
    public roleService: RoleService, 
    public router: Router
  ) { }

  ngOnInit(): void { 
    this.roleService.getRoles().subscribe((res: {}) => {
      this.Roles = res;
    });
  }
  
  addUser(data: any) {
    this.userService.addUser(this.usuario).subscribe((data: {}) => {
      this.router.navigate(['/user/list'])
    })
  }

}

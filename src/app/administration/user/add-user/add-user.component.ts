import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../../service/user.service";
import { RoleService } from "../../../service/role.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  @Input() userObj = { username: '', password: '', email: '', mobile: '', name: '', role_id: 0}
  Roles: any = [];

  constructor(
    public userService: UserService, 
    public roleService: RoleService, 

    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addUser(data: any) {
    this.userService.addUser(this.userObj).subscribe((data: {}) => {
      this.router.navigate(['/user/list'])
    })
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

}

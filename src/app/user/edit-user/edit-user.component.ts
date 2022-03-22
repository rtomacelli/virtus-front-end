import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  userObj: any = {};

  constructor(
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.userService.getSingleUser(this.id).subscribe((res: {}) => {
      this.userObj = res;
    });
  }

  updateUser(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.userService.updateUser(this.id, data).subscribe((res) => {
        this.router.navigate(['/user/list']);
      });
    }
  }

}

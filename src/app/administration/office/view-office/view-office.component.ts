import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from 'src/app/service/office.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-office',
  templateUrl: './view-office.component.html',
  styleUrls: ['./view-office.component.css']
})
export class ViewOfficeComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  officeObj: any = {};
  Usuarios: any = [];

  constructor(
    public officeService: OfficeService,
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.officeService.getSingleOffice(this.id).subscribe((res: {}) => {
      this.officeObj = res;
    });

    this.userService.getUsers().subscribe((usuarios: {}) => {
      this.Usuarios = usuarios;
    });
  }
}

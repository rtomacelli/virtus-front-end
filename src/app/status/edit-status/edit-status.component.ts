import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {StatusService } from "../../service/status.service";

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.css']
})
export class EditStatusComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  statusObj: any = {};

  constructor(
    public statusService: StatusService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.statusService.getSingleStatus(this.id).subscribe((res: {}) => {
      this.statusObj = res;
    });
  }

  updateStatus(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.statusService.updateStatus(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }

}

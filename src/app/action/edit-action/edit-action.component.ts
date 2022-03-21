import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionService } from "../../service/action.service";

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.css']
})
export class EditActionComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  actionObj: any = {};

  constructor(
    public actionService: ActionService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.actionService.getSingleAction(this.id).subscribe((res: {}) => {
      this.actionObj = res;
    });
  }

  updateAction(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.actionService.updateAction(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }

}
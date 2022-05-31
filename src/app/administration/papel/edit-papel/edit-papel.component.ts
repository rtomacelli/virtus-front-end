import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PapelService } from "../../../service/papel.service";

@Component({
  selector: 'app-edit-papel',
  templateUrl: './edit-papel.component.html',
  styleUrls: ['./edit-papel.component.css']
})

export class EditPapelComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  papelObj: any = {};

  constructor(
    public papelService: PapelService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.papelService.getSinglePapel(this.id).subscribe((res: {}) => {
      this.papelObj = res;
    });
  }

  updatePapel(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.papelService.updatePapel(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from "../../../service/office.service";

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styleUrls: ['./edit-office.component.css']
})
export class EditOfficeComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  officeObj: any = {};

  constructor(
    public officeService: OfficeService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.officeService.getSingleOffice(this.id).subscribe((res: {}) => {
      this.officeObj = res;
    });
  }

  updateOffice(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.officeService.updateOffice(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }

}

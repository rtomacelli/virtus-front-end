import { Component, OnInit } from '@angular/core';
import { OfficeService } from "../../service/office.service";

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.css']
})
export class ListOfficeComponent implements OnInit {

  Office: any = [];
  constructor(public officeService: OfficeService) {}
  
  ngOnInit() {
    this.fetchOffice();
  }

  fetchOffice() {
    return this.officeService.getOffice().subscribe((res: {}) => {
      this.Office = res;
    });
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.officeService.deleteOffice(id).subscribe((res) => {
        this.fetchOffice();
      });
    }
  }


}

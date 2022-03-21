import { Component, OnInit } from '@angular/core';
import { StatusService } from "../../service/status.service";

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.css']
})
export class ListStatusComponent implements OnInit {

  Status: any = [];
  constructor(public statusService: StatusService) {}
  
  ngOnInit() {
    this.fetchStatus();
  }

  fetchStatus() {
    return this.statusService.getStatus().subscribe((res: {}) => {
      this.Status = res;
    });
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      this.statusService.deleteStatus(id).subscribe((res) => {
        this.fetchStatus();
      });
    }
  }

}

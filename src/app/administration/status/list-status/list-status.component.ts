import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/service/status.service';


@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
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

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.statusService.deleteStatus(id).subscribe((res) => {
        this.fetchStatus();
      });
    }
  }
}

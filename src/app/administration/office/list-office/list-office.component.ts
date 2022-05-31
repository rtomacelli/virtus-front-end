import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { OfficeService } from 'src/app/service/office.service';

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.css'],
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

export class ListOfficeComponent implements OnInit {

  Offices: any = [];

  columnsToDisplay       = ['id', 'nome', 'abreviatura', 'descricao', 'chefe_nome'];
  columnsName            = ['id', 'Nome', 'Abreviatura', 'Descrição', 'Chefe'];

  constructor(public officeService: OfficeService) {}
  
  ngOnInit() {
    this.fetchOffices();
  }

  fetchOffices() {
    return this.officeService.getOffice().subscribe((res: {}) => {
      this.Offices = res;
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
      this.officeService.deleteOffice(id).subscribe((res) => {
        this.fetchOffices();
      });
    }
  }

  toggleRow(element: { expanded: boolean }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded;
  }

  manageAllRows(flag: boolean) {
    this.Offices.forEach((row) => {
      row.expanded = flag;
    });
  }

}

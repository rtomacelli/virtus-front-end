import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OfficeService } from "../../../service/office.service";

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})


export class ListOfficeComponent implements OnInit {

  // Autor', 'Criado em', 'Versao origem', 'Status não devem aparecer na listagem.

  label:  string[] = ['Nome', 'Abreviatura', 'Descricao', 'Chefe']
  cols:   string[] = ['nome', 'abreviatura', 'descricao', 'chefe_id']
  displayedColumns: string[] = ['nome', 'abreviatura', 'descricao', 'chefe_id'];

  Offices: any = [];

  constructor(public officeService: OfficeService) {}
  
  ngOnInit() {
    this.fetchOffice();
  }

  fetchOffice() {
    return this.officeService.getOffice().subscribe((res: {}) => {
      this.Offices = res;
    });
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.officeService.deleteOffice(id).subscribe((res) => {
        this.fetchOffice();
      });
    }
  }


  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
     this.Offices.forEach(row => {
       row.expanded = false;
     })
    element.expanded = !element.expanded
  }

  manageAllRows(flag: boolean) {
    this.Offices.forEach(row => {
      row.expanded = flag;
    })
  }
}

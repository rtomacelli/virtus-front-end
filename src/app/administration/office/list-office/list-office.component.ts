import { Component, OnInit } from '@angular/core';
import { OfficeService } from "../../../service/office.service";

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.css']
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
}

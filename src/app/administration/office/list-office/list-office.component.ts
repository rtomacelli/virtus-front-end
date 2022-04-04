import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OfficeService } from "../../../service/office.service";

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.css']
})
export class ListOfficeComponent implements OnInit {

  label:  string[] = ['Nome', 'Abreviatura', 'Descricao', 'Chefe',    'Autor',     'Criado em', 'Versao origem', 'Status']
  cols:   string[] = ['nome', 'abreviatura', 'descricao', 'chefe_id', 'author_id', 'criado_em', 'id_versao_origem', 'status_id']
  displayedColumns: string[] = ['nome', 'abreviatura', 'descricao', 'chefe_id', 'author_id', 'criado_em', 'id_versao_origem', 'status_id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Offices: any = [];

  constructor(public officeService: OfficeService) {}
  
  ngOnInit() {
    this.Offices.paginator = this.paginator;
    this.Offices.sort = this.sort;
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

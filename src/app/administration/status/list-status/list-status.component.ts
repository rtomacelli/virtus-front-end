import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StatusService } from "../../../service/status.service";

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.css']
})
export class ListStatusComponent implements OnInit {


  label: string[] = ['Nome', 'Descrição',   'Autor',     'Criado em',  'Versão',           'Status',    'Estereótipo']
  cols: string[] =  ['name', 'description', 'author_id', 'created_at', 'id_versao_origem', 'status_id', 'stereotype']

  displayedColumns: string[] = ['name',  'description', 'author_id', 'created_at', 'id_versao_origem', 'status_id', 'stereotype']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Status: any = [];
  constructor(public statusService: StatusService) {}
  
  ngOnInit() {
    this.Status.paginator = this.paginator;
    this.Status.sort = this.sort;
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

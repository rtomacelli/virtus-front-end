import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FeatureService } from "../../../service/feature.service";

@Component({
  selector: 'app-list-feature',
  templateUrl: './list-feature.component.html',
  styleUrls: ['./list-feature.component.css']
})
export class ListFeatureComponent implements OnInit {

  label:  string[] = ['Nome', 'Código', 'Descricao',   'Autor',     'Criado em',   'Versao origem',    'Status']
  cols:   string[] = ['name', 'code',   'description', 'author_id', 'created_at',  'id_versao_origem', 'status_id'];
  displayedColumns: string[] = ['name', 'code', 'description', 'author_id', 'created_at', 'id_versao_origem', 'status_id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Features: any = [];

  constructor(public featureService: FeatureService) {}
  
  ngOnInit() {
    this.Features.paginator = this.paginator;
    this.Features.sort = this.sort;
    this.fetchFeature();
  }

  fetchFeature() {
    return this.featureService.getFeature().subscribe((res: {}) => {
      this.Features = res;
    });
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      this.featureService.deleteFeature(id).subscribe((res) => {
        this.fetchFeature();
      });
    }
  }

}

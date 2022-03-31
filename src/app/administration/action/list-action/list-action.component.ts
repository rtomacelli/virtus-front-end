import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActionService } from "../../../service/action.service";

@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.css']
})

export class ListActionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'origin_status_id', 'destination_status_id', 'other_than', 'description', 'author_id', 'criado_em', 'id_versao_origem', 'status_id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Actions: any = [];

  constructor(public actionService: ActionService) {}
  ngOnInit() {
    this.Actions.paginator = this.paginator;
    this.Actions.sort = this.sort;
    this.fetchActions();
  }
  fetchActions() {
    return this.actionService.getAction().subscribe((res: {}) => {
      this.Actions = res;
    });
  }
  delete(id: any) {
    if (window.confirm('Deseja realmente excluir esta ação?')) {
      this.actionService.deleteAction(id).subscribe((res) => {
        this.fetchActions();
      });
    }
  }

}

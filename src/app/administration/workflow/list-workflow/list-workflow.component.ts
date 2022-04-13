import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WorkflowService } from "../../../service/workflow.service";

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.css']
})
export class ListWorkflowComponent implements OnInit {

  label:  string[] = ['#',  'Nome', 'Descrição',   'Entidade',    'Inicio',	  'Término'];
  cols:   string[] = ['id', 'name', 'description', 'entity_type', 'start_at',	'end_at'];
  displayedColumns: string[] = ['id', 'name', 'description', 'entity_type', 'start_at',	'end_at'];

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Workflows: any = [];

  constructor(public workflowService: WorkflowService) {}
  
  ngOnInit() {
    this.Workflows.paginator = this.paginator;
    this.Workflows.sort = this.sort;
    this.fetchWorkflow();
  }

  fetchWorkflow() {
    return this.workflowService.getWorkflow().subscribe((res: {}) => {
      this.Workflows = res;
    });
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      this.workflowService.deleteWorkflow(id).subscribe((res) => {
        this.fetchWorkflow();
      });
    }
  }

}

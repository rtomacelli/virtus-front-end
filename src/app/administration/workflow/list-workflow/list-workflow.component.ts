import { HttpClient } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { WorkflowService } from 'src/app/service/workflow.service';

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.css'],
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
export class ListWorkflowComponent implements OnInit {

  workflows: any = [];

  constructor(public workflowService: WorkflowService) {}
  
  ngOnInit() {
    this.fetchWorkflows();
  }

  fetchWorkflows() {
    return this.workflowService.getWorkflow().subscribe((res: {}) => {
      this.workflows = res;
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
      this.workflowService.deleteWorkflow(id).subscribe((res) => {
        this.fetchWorkflows();
      });
    }
  }
}

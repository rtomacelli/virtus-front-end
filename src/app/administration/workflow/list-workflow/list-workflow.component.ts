import { Component, OnInit } from '@angular/core';
import { WorkflowService } from "../../../service/workflow.service";

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.css']
})
export class ListWorkflowComponent implements OnInit {

  Workflow: any = [];
  constructor(public workflowService: WorkflowService) {}
  
  ngOnInit() {
    this.fetchWorkflow();
  }

  fetchWorkflow() {
    return this.workflowService.getWorkflow().subscribe((res: {}) => {
      this.Workflow = res;
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

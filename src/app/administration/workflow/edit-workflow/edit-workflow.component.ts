import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowService } from "../../../service/workflow.service";

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
  styleUrls: ['./edit-workflow.component.css']
})
export class EditWorkflowComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  workflowObj: any = {};

  constructor(
    public workflowService: WorkflowService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.workflowService.getSingleWorkflow(this.id).subscribe((res: {}) => {
      this.workflowObj = res;
    });
  }

  updateWorkflow(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.workflowService.updateWorkflow(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }
}

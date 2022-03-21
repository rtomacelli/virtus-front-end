import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowService } from "../../service/workflow.service";

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.css']
})
export class AddWorkflowComponent implements OnInit {

  @Input() workflowObj = { name: '', description: '', author_id: 0, created_at: '', id_versao_origem: 0, status_id: 0, stereotype: '' }

  constructor(
    public workflowService: WorkflowService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addWorkflow(data: any) {
    this.workflowObj.created_at = new Date().toISOString();
    this.workflowService.addWorkflow(this.workflowObj).subscribe((data: {}) => {
      this.router.navigate(['/list'])
    })
  }

}

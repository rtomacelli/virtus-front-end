import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowService } from "../../../service/workflow.service";

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.css']
})
export class AddWorkflowComponent implements OnInit {

  @Input() workflowObj = { name: '', description: '', entity_type: '' ,  start_at: '', end_at: '' }
  

  constructor(
    public workflowService: WorkflowService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addWorkflow(data: any) {
    this.workflowService.addWorkflow(this.workflowObj).subscribe((data: {}) => {
      this.router.navigate(['/workflow/list'])
    })
  }

}

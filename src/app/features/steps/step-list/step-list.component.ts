import { Component, OnInit } from '@angular/core'
import { Step } from 'src/app/model/step';
import { StepService } from 'src/app/service/step/step.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.css']
})
export class StepListComponent implements OnInit {
  steps: Step[] = [];
  selectedStep?:Step;
  constructor(private stepService: StepService, private messageService: MessageService) {}
  getSteps(): void {
    this.stepService.getSteps().subscribe(steps=>this.steps = steps);
  }
  ngOnInit(): void {
    this.getSteps();
  }
  onSelect(step:Step): void{
    this.selectedStep = step;
    this.messageService.add(`StepsComponent: Selected step id=${step.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.stepService.addStep({ name } as Step)
      .subscribe(step => {
        this.steps.push(step);
      });
  }
  delete(step: Step): void {
    this.steps = this.steps.filter(h => h !== step);
    this.stepService.deleteStep(step.id).subscribe();
    
  }
}

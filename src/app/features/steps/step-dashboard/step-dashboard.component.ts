import { Component, OnInit } from '@angular/core';
import { Step } from '../../../model/step'
import { StepService } from '../../../service/step/step.service';

@Component({
  selector: 'app-step-dashboard',
  templateUrl: './step-dashboard.component.html',
  styleUrls: [ './step-dashboard.component.css' ]
})
export class StepDashboardComponent implements OnInit {
  steps: Step[] = [];

  constructor(private stepService: StepService) { }

  ngOnInit(): void {
    this.getSteps();
  }

  getSteps(): void {
    this.stepService.getSteps()
      .subscribe(steps => this.steps = steps.slice(0, 10));
  }
}

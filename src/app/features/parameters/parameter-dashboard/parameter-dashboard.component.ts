import { Component, OnInit } from '@angular/core';
import { Parameter } from '../../../model/parameter'
import { ParameterService } from '../../../service/parameter/parameter.service';

@Component({
  selector: 'app-parameter-dashboard',
  templateUrl: './parameter-dashboard.component.html',
  styleUrls: [ './parameter-dashboard.component.css' ]
})
export class ParameterDashboardComponent implements OnInit {
  parameters: Parameter[] = [];

  constructor(private parameterService: ParameterService) { }

  ngOnInit(): void {
    this.getParameters();
  }

  getParameters(): void {
    this.parameterService.getParameters()
      .subscribe(parameters => this.parameters = parameters.slice(0, 10));
  }
}

import { Component, OnInit } from '@angular/core';
import { Scenario } from '../../../model/scenario'
import { ScenarioService } from '../../../service/scenario/scenario.service';

@Component({
  selector: 'app-scenario-dashboard',
  templateUrl: './scenario-dashboard.component.html',
  styleUrls: [ './scenario-dashboard.component.css' ]
})
export class ScenarioDashboardComponent implements OnInit {
  scenarios: Scenario[] = [];

  constructor(private scenarioService: ScenarioService) { }

  ngOnInit(): void {
    this.getScenarios();
  }

  getScenarios(): void {
    this.scenarioService.getScenarios()
      .subscribe(scenarios => this.scenarios = scenarios.slice(0, 10));
  }
}

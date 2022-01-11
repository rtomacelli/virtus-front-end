import { Component, OnInit } from '@angular/core'
import { Scenario } from 'src/app/model/scenario';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.css']
})
export class ScenarioListComponent implements OnInit {
  scenarios: Scenario[] = [];
  selectedScenario?:Scenario;
  constructor(private scenarioService: ScenarioService, private messageService: MessageService) {}
  getScenarios(): void {
    this.scenarioService.getScenarios().subscribe(scenarios=>this.scenarios = scenarios);
  }
  ngOnInit(): void {
    this.getScenarios();
  }
  onSelect(scenario:Scenario): void{
    this.selectedScenario = scenario;
    this.messageService.add(`ScenariosComponent: Selected scenario id=${scenario.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.scenarioService.addScenario({ name } as Scenario)
      .subscribe(scenario => {
        this.scenarios.push(scenario);
      });
  }
  delete(scenario: Scenario): void {
    this.scenarios = this.scenarios.filter(h => h !== scenario);
    this.scenarioService.deleteScenario(scenario.id).subscribe();
    
  }
}

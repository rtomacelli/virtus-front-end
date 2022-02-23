import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scenario } from '../../../model/scenario';
import { ScenarioService } from '../../../service/scenario/scenario.service';
@Component({
  selector: 'app-scenario-form',
  templateUrl: './scenario-form.component.html',
  styleUrls: ['./scenario-form.component.css']
})
export class ScenarioFormComponent {

  public model: Scenario = new Scenario(
    '', '', '', '', ''
  );

  constructor(
    private route: ActivatedRoute,
    private scenarioService: ScenarioService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if (id != 0) {
      this.getScenario(id);
    } else {
      this.newScenario();
    }
  }

  submitted = false;
  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.model.id) {
      this.scenarioService.addScenario(this.model).subscribe(scenario => this.model = scenario)
    } else {
      this.scenarioService.updateScenario(this.model).subscribe(scenario => {})
    }
    this.submitted = true;
  }
  newScenario() {
    this.model = new Scenario('', '', '', '', '');
  }
  getScenario(id: number): void {
    this.scenarioService.getScenario(''+id).subscribe(scenario => this.model = scenario)
  }
  editScenario(id: number): void {
    this.scenarioService.getScenario(''+id).subscribe(scenario => this.model = scenario)
    this.submitted = true;
  }

  goBack() {
    this.submitted = false;
    console.log("goBack: "+this.model.id)
    this.getScenario(this.model.id)
  }

}

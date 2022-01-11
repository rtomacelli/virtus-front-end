import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from 'src/app/model/feature';
import { FeatureService } from 'src/app/service/feature/feature.service';
import { Scenario } from '../../../model/scenario';
import { ScenarioService } from '../../../service/scenario/scenario.service';
@Component({
  selector: 'app-scenario-form',
  templateUrl: './scenario-form.component.html',
  styleUrls: ['./scenario-form.component.css']
})
export class ScenarioFormComponent {

  features: Array<Feature> = [];

  public model: Scenario = new Scenario(
    '', '', 0
  );

  constructor(
    private route: ActivatedRoute,
    private scenarioService: ScenarioService,
    private featureService: FeatureService,
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
    this.loadFeatures();
  }
  loadFeatures(): void {
    this.featureService.getFeatures().subscribe(features => this.features = features);
  }
  onSubmit() {
    if (!this.model.id) {
      this.scenarioService.addScenario(this.model).subscribe(scenario => this.model = scenario)
    } else {
      this.scenarioService.updateScenario(this.model).subscribe(scenario => {
      })
    }
    this.submitted = true;
  }
  newScenario() {
    this.model = new Scenario('', '');
  }
  getScenario(id: number): void {
    this.scenarioService.getScenario(id).subscribe(scenario => this.model = scenario)
  }
  editScenario(id: number): void {
    this.scenarioService.getScenario(id).subscribe(scenario => this.model = scenario)
    this.submitted = true;
  }

  goBack() {
    this.submitted = false;
    this.getScenario(this.model.id)
  }

}

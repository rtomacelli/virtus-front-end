import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Context } from 'src/app/model/context';
import { Environment } from 'src/app/model/environment';
import { Feature } from 'src/app/model/feature';
import { Scenario } from 'src/app/model/scenario';
import { TestCase } from 'src/app/model/test-case';
import { User } from 'src/app/model/user';
import { ContextService } from 'src/app/service/context/context.service';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { FeatureService } from 'src/app/service/feature/feature.service';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { TestCaseService } from 'src/app/service/test-case/test-case.service';
import { UserService } from 'src/app/service/user/user.service';
import { Run } from '../../../model/run';
import { RunService } from '../../../service/run/run.service';
import { DateTime } from 'luxon';
@Component({
  selector: 'app-run-form',
  templateUrl: './run-form.component.html',
  styleUrls: ['./run-form.component.css']
})
export class RunFormComponent {

  features: Array<Feature> = [];
  environments: Array<Environment> = [];
  contexts: Array<Context> = [];
  selectedScenario: Scenario;
  selectedFeature: Feature;
  scenarios: Array<Scenario> = [];
  users: Array<User> = [];

  public model: Run = new Run(
    '', 0, '', '', '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private runService: RunService,
    private featureService: FeatureService,
    private environmentService: EnvironmentService,
    private contextService: ContextService,
    private scenarioService: ScenarioService,
    private userService: UserService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getRun(id);
    } else {
      this.newRun();
    }
  }

  
  submitted = false;
  ngOnInit(): void {
    this.loadFeatures();
    this.loadEnvironments();
    this.loadContexts();
    this.loadScenarios();
    this.loadUsers();
  }
  loadFeatures(): void {
    this.featureService.getFeatures().subscribe(features=>this.features = features);
  }
  loadEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments=>this.environments = environments);
  }
  loadContexts(): void {
    this.contextService.getContexts().subscribe(contexts=>this.contexts = contexts);
  }
  loadScenarios(): void {
    this.scenarioService.getScenarios().subscribe(scenarios=>this.scenarios = scenarios);
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe(users=>this.users = users);
  }
  onSubmit() { 
    if(!this.model.id){
      this.runService.addRun(this.model).subscribe(run => this.model = run)
    } else {
      this.runService.updateRun(this.model).subscribe(run => {
      })
    }
    this.submitted = true; 
  }
  loadListOfStepsAndDescriptionByScenarioId(): void {
    this.scenarioService.getScenario(this.model.scenarioId).subscribe(selectedScenario=>{
      this.selectedScenario = selectedScenario
      let date = DateTime.now().setLocale('en-ca').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
      this.model.name = this.selectedScenario.name+' - '+date
      this.model.description = this.selectedScenario.description
      this.model.listOfSteps = this.selectedScenario.listOfSteps
    });
  }
  loadFeaturesByScenario(): void {
    this.featureService.getFeatureByScenarioId(this.model.scenarioId).subscribe(feature=>{
      this.model.featureId = feature.id
    });
  }
  loadContextsByEnvironment(): void {
    this.contextService.getContextsByEnvironmentId(this.model.environmentId).subscribe(contexts=>{
      this.contexts = contexts
      this.model.contextId = 0
    });
  }
  newRun() {
    this.model = new Run('',0, '');
  }
  getRun(id:number): void {
    this.runService.getRun(id).subscribe(run => this.model = run)
  }
  editRun(id:number): void {
    this.runService.getRun(id).subscribe(run => this.model = run)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getRun(this.model.id)
  }

}

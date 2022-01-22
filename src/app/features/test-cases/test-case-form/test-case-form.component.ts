import { Location } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Context } from 'src/app/model/context';
import { Environment } from 'src/app/model/environment';
import { Feature } from 'src/app/model/feature';
import { ContextService } from 'src/app/service/context/context.service';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { FeatureService } from 'src/app/service/feature/feature.service';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { TestCase } from '../../../model/test-case';
import { TestCaseService } from '../../../service/test-case/test-case.service';
import { TestCaseScenariosTableComponent } from '../test-case-scenarios-table/test-case-scenarios-table.component';
@Component({
  selector: 'app-test-case-form',
  templateUrl: './test-case-form.component.html',
  styleUrls: ['./test-case-form.component.css']
})
export class TestCaseFormComponent {

  scenarios: Array<Feature> = [];
  environments: Array<Environment> = [];
  contexts: Array<Context> = [];

  public model: TestCase = new TestCase(
    '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private testCaseService: TestCaseService,
    private scenarioService: ScenarioService,
    private environmentService: EnvironmentService,
    private contextService: ContextService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getTestCase(id);
    } else {
      this.newTestCase();
    }
  }
  @ViewChild(TestCaseScenariosTableComponent, {static: false}) childRef: TestCaseScenariosTableComponent;
  submitted = false;
  ngOnInit(): void {
    this.loadScenarios();
    this.loadEnvironments();
    this.loadContexts();
  }
  loadScenarios(): void {
    this.scenarioService.getScenarios().subscribe(scenarios=>this.scenarios = scenarios);
  }
  loadEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments=>this.environments = environments);
  }
  loadContextsByEnvironment(): void {
    this.contextService.getContextsByEnvironmentId(this.model.environmentId).subscribe(contexts=>this.contexts = contexts);
  }
  loadContexts(): void {
    this.contextService.getContexts().subscribe(contexts=>this.contexts = contexts);
  }
  onSubmit() { 
    if(!this.model.id){
      this.testCaseService.addTestCase(this.model).subscribe(testCase => this.model = testCase)
    } else {
      this.testCaseService.updateTestCase(this.model).subscribe(testCase => {})
    }
    this.submitted = true; 
  }
  newTestCase() {
    this.model = new TestCase('', '');    
    this.destroyScenarios()
  }
  getTestCase(id:number): void {
    this.testCaseService.getTestCase(id).subscribe(testCase => this.model = testCase)
  }
  editTestCase(id:number): void {
    this.testCaseService.getTestCase(id).subscribe(testCase => this.model = testCase)
    this.submitted = true; 
  }
  destroyScenarios() {
    if (this.childRef) {
      this.childRef.ngOnDestroy();
    }
  }
  goBack(){
    this.submitted = false; 
    this.getTestCase(this.model.id)
  }

}

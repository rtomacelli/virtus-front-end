import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Context } from 'src/app/model/context';
import { Environment } from 'src/app/model/environment';
import { Feature } from 'src/app/model/feature';
import { ContextService } from 'src/app/service/context/context.service';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { FeatureService } from 'src/app/service/feature/feature.service';
import { TestCase } from '../../../model/test-case';
import { TestCaseService } from '../../../service/test-case/test-case.service';
@Component({
  selector: 'app-test-case-form',
  templateUrl: './test-case-form.component.html',
  styleUrls: ['./test-case-form.component.css']
})
export class TestCaseFormComponent {

  features: Array<Feature> = [];
  environments: Array<Environment> = [];
  contexts: Array<Context> = [];

  public model: TestCase = new TestCase(
    '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private testCaseService: TestCaseService,
    private featureService: FeatureService,
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

  submitted = false;
  ngOnInit(): void {
    this.loadFeatures();
    this.loadEnvironments();
    this.loadContexts();
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
  }
  getTestCase(id:number): void {
    this.testCaseService.getTestCase(id).subscribe(testCase => this.model = testCase)
  }
  editTestCase(id:number): void {
    this.testCaseService.getTestCase(id).subscribe(testCase => this.model = testCase)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getTestCase(this.model.id)
  }

}

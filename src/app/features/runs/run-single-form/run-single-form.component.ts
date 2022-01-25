import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Context } from 'src/app/model/context';
import { Environment } from 'src/app/model/environment';
import { TestCase } from 'src/app/model/test-case';
import { User } from 'src/app/model/user';
import { ContextService } from 'src/app/service/context/context.service';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { TestCaseService } from 'src/app/service/test-case/test-case.service';
import { UserService } from 'src/app/service/user/user.service';
import { Run } from 'src/app/model/run';
import { RunService } from 'src/app/service/run/run.service';
import { FeatureService } from 'src/app/service/feature/feature.service';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { Scenario } from 'src/app/model/scenario';
import { Feature } from 'src/app/model/feature';
import { DateTime } from 'luxon';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CircleProgressDialog } from './circle-progress-dialog/circle-progress-dialog';
@Component({
  selector: 'app-run-single-form',
  templateUrl: './run-single-form.component.html',
  styleUrls: ['./run-single-form.component.css']
})
export class RunSingleFormComponent {

  newScenario: Scenario
  features: Array<Feature> = []
  environments: Array<Environment> = []
  contexts: Array<Context> = []
  testCases: Array<TestCase> = []
  users: Array<User> = []

  public model: Run = new Run(
    '', 0, '', '', '', '', 0
  )

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private runService: RunService,
    private scenarioService: ScenarioService,
    private featureService: FeatureService,
    private environmentService: EnvironmentService,
    private contextService: ContextService,
    private testCaseService: TestCaseService,
    private userService: UserService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if (id != 0) {
      this.getRun(id);
    } else {
      this.newRun();
    }
  }
  dialogRef: any;
  executed = false;
  passed = false;
  failed = false;
  submitted = false;
  ngOnInit(): void {
    this.loadFeatures();
    this.loadEnvironments();
    this.loadContexts();
    this.loadTestCases();
    this.loadUsers();
  }
  openDialog() {
    this.dialogRef = this.dialog.open(CircleProgressDialog);    
  }  
  loadFeatures(): void {
    this.featureService.getFeatures().subscribe(features => this.features = features);
  }
  loadEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments => this.environments = environments);
  }
  loadContexts(): void {
    this.contextService.getContexts().subscribe(contexts => this.contexts = contexts);
  }
  loadContextsByEnvironment(): void {
    this.contextService.getContextsByEnvironmentId(this.model.environmentId).subscribe(contexts => this.contexts = contexts);
  }
  loadTestCases(): void {
    this.testCaseService.getTestCases().subscribe(testCases => this.testCases = testCases);
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  onSubmit() {
    if (!this.model.id) {
      this.runService.addRun(this.model).subscribe(run => this.model = run)
    } else {
      this.runService.updateRun(this.model).subscribe(run => {
      })
    }
    this.submitted = true;
  }
  newRun() {
    this.model = new Run('Play a tone', 0, 'Given my test setup runs \nAnd \"NumberA\" configured to play tone \"5000,10,850\"\nAnd \"NumberB\" configured to record calls for download\nWhen I make a call from \"NumberA\" to \"NumberB\"\nThen \"NumberB\" should be able to listen to frequencies \"850\"\nAnd \"NumberA\" should be reset\nAnd \"NumberB\" should be reset', 'Description', '', '', 9, 'Play', 1, 1, 1);
    this.executed = false
  }
  run() {
    console.log('run - user - id: '+this.model.userId)
    this.model.featureName = this.features.filter(feat=>
      feat.id === this.model.featureId)[0].name
      this.runService.run(this.model).subscribe(run => {
        this.dialogRef.close()        
        if(run.result==='PASSED'){
          this.passed = true
        } else {
          this.failed = true
        }
        this.model.logs = run.logs
        this.executed = true
      this.saveScenarioAndRun()
    })
  }

  saveScenarioAndRun(){
    const scenarioName = this.model.name
    const description = this.model.description
    const listOfSteps = this.model.listOfSteps
    const featureId = this.model.featureId
    const featureName = this.model.featureName
    this.newScenario = new Scenario(scenarioName,description,listOfSteps,''+featureId,featureName)
    let date = DateTime.now().setLocale('en-ca').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    this.model.runAt = date    
    this.model.name = this.newScenario.name+' - '+date    
    this.scenarioService.addScenario(this.newScenario).subscribe(scenario => {
      this.model.scenarioId = scenario.id
      console.log('saved scenario - id: '+this.model.id)
      console.log('saved scenario - name: '+this.model.name)
      this.model.scenarioId = scenario.id
      this.addRun()
    })
  }
  addRun(){
    console.log('scenario - id: '+this.model.scenarioId)
    this.runService.addRun(this.model).subscribe(run => this.model = run)
  }
  getRun(id: number): void {
    this.runService.getRun(id).subscribe(run => this.model = run)
  }
  editRun(id: number): void {
    this.runService.getRun(id).subscribe(run => this.model = run)
    this.submitted = true;
  }

  goBack() {
    this.submitted = false;
    this.getRun(this.model.id)
  }

}

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { Context } from 'src/app/model/context';
import { Environment } from 'src/app/model/environment';
import { Run } from 'src/app/model/run';
import { Scenario } from 'src/app/model/scenario';
import { TestCase } from 'src/app/model/test-case';
import { User } from 'src/app/model/user';
import { ContextService } from 'src/app/service/context/context.service';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { RunService } from 'src/app/service/run/run.service';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { TestCaseService } from 'src/app/service/test-case/test-case.service';
import { UserService } from 'src/app/service/user/user.service';
import { CircleProgressDialog } from '../../circle-progress-dialog/circle-progress-dialog';
@Component({
  selector: 'app-run-single-form',
  templateUrl: './run-single-form.component.html',
  styleUrls: ['./run-single-form.component.css']
})
export class RunSingleFormComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  newScenario: Scenario
  environments: Array<Environment> = []
  contexts: Array<Context> = []
  testCases: Array<TestCase> = []
  users: Array<User> = []

  public model: Run = new Run(
    '', '', '', '', '', '', ''
  )

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private runService: RunService,
    private scenarioService: ScenarioService,
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
    this.loadEnvironments();
    this.loadContexts();
    this.loadTestCases();
    this.loadUsers();
  }
  openDialog() {
    this.dialogRef = this.dialog.open(CircleProgressDialog);
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
    this.model.tags = this.tags.join(',')
    if (!this.model.id) {
      this.runService.addRun(this.model).subscribe(run => this.model = run)
    } else {
      this.runService.updateRun(this.model).subscribe(run => {
      })
    }
    this.submitted = true;
  }
  newRun() {
    this.model = new Run(
      'Play a tone', 
      '', 
      'Given my test setup runs \nAnd \"NumberA\" configured to play tone \"5000,10,850\"\nAnd \"NumberB\" configured to record calls for download\nWhen I make a call from \"NumberA\" to \"NumberB\"\nThen \"NumberB\" should be able to listen to frequencies \"850\"\nAnd \"NumberA\" should be reset\nAnd \"NumberB\" should be reset', 'Description', 
      '',
      '',
      '1', 
      '1', 
      '1',
      '',
      '');
    this.executed = false
  }
  run() {
    console.log(this.tags)
    this.runService.run(this.model).subscribe(run => {
      console.log("run")
      this.dialogRef.close()
      if (run && run.result === 'PASSED') {
        console.log("PASSED")
        this.passed = true
        this.saveScenarioAndRun()
      } else {
        console.log("FAILED")
        this.failed = true
      }
      console.log("middle")
      if(this.failed && undefined != this.model){        
        this.model.logs += "\n\nService is unreachable."
      }
      console.log("final")
      this.executed = true      
    })
  }

  saveScenarioAndRun() {
    const scenarioName = this.model.name
    const description = this.model.description
    const listOfSteps = this.model.listOfSteps
    this.newScenario = new Scenario(scenarioName, description, listOfSteps)
    let date = DateTime.now().setLocale('en-ca').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
    this.model.runAt = date
    this.model.name = this.newScenario.name + ' - ' + date
    this.scenarioService.addScenario(this.newScenario).subscribe(scenario => {
      this.model.scenarioId = '' + scenario.id
      this.addRun()
    })
  }
  addRun() {
    console.log('scenario - id: ' + this.model.scenarioId)
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}


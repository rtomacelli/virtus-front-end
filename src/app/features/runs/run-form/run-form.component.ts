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
import { Scenario } from 'src/app/model/scenario';
import { User } from 'src/app/model/user';
import { ContextService } from 'src/app/service/context/context.service';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { UserService } from 'src/app/service/user/user.service';
import { Run } from '../../../model/run';
import { RunService } from '../../../service/run/run.service';
import { CircleProgressDialog } from '../../circle-progress-dialog/circle-progress-dialog';

@Component({
  selector: 'app-run-form',
  templateUrl: './run-form.component.html',
  styleUrls: ['./run-form.component.css']
})
export class RunFormComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  newScenario: Scenario
  environments: Array<Environment> = [];
  contexts: Array<Context> = [];
  selectedScenario: Scenario;
  scenarios: Array<Scenario> = [];
  users: Array<User> = [];
  dialogRef: any;
  executed = false;
  passed = false;
  failed = false; 
  submitted = false;
  public model: Run = new Run(
    '', '', '', '', '', '', ''
  );

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private runService: RunService,
    private environmentService: EnvironmentService,
    private contextService: ContextService,
    private scenarioService: ScenarioService,
    private userService: UserService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if (id != 0) {
      this.getRun(id);
    } else {
      this.newRun();
    }
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CircleProgressDialog);
  }
  ngOnInit(): void {
    this.loadEnvironments();
    this.loadContexts();
    this.loadScenarios();
    this.loadUsers();
  }
  loadEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments => this.environments = environments);
  }
  loadContexts(): void {
    this.contextService.getContexts().subscribe(contexts => this.contexts = contexts);
  }
  loadScenarios(): void {
    this.scenarioService.getScenarios().subscribe(scenarios => this.scenarios = scenarios);
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  onSubmit() {
    this.model.tags = this.tags.join(',')
    console.log(this.tags)
    console.log(this.model.tags)
    if (!this.model.id) {
      this.runService.addRun(this.model).subscribe(run => this.model = run)
    } else {
      this.runService.updateRun(this.model).subscribe(run => {
      })
    }
    this.submitted = true;
  }
  loadListOfStepsAndDescriptionByScenarioId(): void {
    this.scenarioService.getScenario(this.model.scenarioId).subscribe(selectedScenario => {
      this.selectedScenario = selectedScenario
      let date = DateTime.now().setLocale('en-ca').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
      this.model.name = this.selectedScenario.name + ' - ' + date
      this.model.description = this.selectedScenario.description
      this.model.listOfSteps = this.selectedScenario.listOfSteps
    });
  }
  loadContextsByEnvironment(): void {
    this.contextService.getContextsByEnvironmentId(this.model.environmentId).subscribe(contexts => {
      this.contexts = contexts
      if (this.contexts.length > 0 && this.contexts[0].id != 0) {
        this.model.contextId = "" + this.contexts[0].id
      } else {
        this.model.contextId = undefined
      }
    });
  }
  newRun() {
    this.model = new Run('', '', '');
  }
  getRun(id: number): void {
    this.runService.getRun(id).subscribe(run => {
      this.model = run
      this.tags = run.tags.split(",")
    })
  }
  editRun(id: number): void {
    this.runService.getRun(id).subscribe(run => this.model = run)
    this.submitted = true;
  }

  goBack() {
    this.submitted = false;
    this.getRun(this.model.id)
  }
  run() {
    this.runService.run(this.model).subscribe(run => {
      this.dialogRef.close()
      if (run.result === 'PASSED') {
        this.passed = true
        this.saveScenarioAndRun()
      } else {
        this.failed = true
      }
      this.model.logs = run.logs
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

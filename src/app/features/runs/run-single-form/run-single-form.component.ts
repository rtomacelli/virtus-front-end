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
@Component({
  selector: 'app-run-single-form',
  templateUrl: './run-single-form.component.html',
  styleUrls: ['./run-single-form.component.css']
})
export class RunSingleFormComponent {

  environments: Array<Environment> = [];
  contexts: Array<Context> = [];
  testCases: Array<TestCase> = [];
  users: Array<User> = [];

  public model: Run = new Run(
    '', '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private runService: RunService,
    private environmentService: EnvironmentService,
    private contextService: ContextService,
    private testCaseService: TestCaseService,
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
    this.loadEnvironments();
    this.loadContexts();
    this.loadTestCases();
    this.loadUsers();
  }
  loadEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments=>this.environments = environments);
  }
  loadContexts(): void {
    this.contextService.getContexts().subscribe(contexts=>this.contexts = contexts);
  }
  loadContextsByEnvironment(): void {
    console.log("loadContextsByEnvironment - "+this.model.environmentId)
    this.contextService.getContextsByEnvironmentId(this.model.environmentId).subscribe(contexts=>this.contexts = contexts);
  }
  loadTestCases(): void {
    this.testCaseService.getTestCases().subscribe(testCases=>this.testCases = testCases);
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
  newRun() {
    this.model = new Run('', '');
  }
  run() {
    this.runService.run(this.model).subscribe(run => this.model = run)
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

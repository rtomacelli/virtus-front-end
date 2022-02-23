import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/model/environment';
import { Parameter } from 'src/app/model/parameter';
import { PhoneNumber } from 'src/app/model/phonenumber';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { NumberService } from 'src/app/service/number/number.service';
import { ParameterService } from 'src/app/service/parameter/parameter.service';
import { Context } from '../../../model/context';
import { ContextService } from '../../../service/context/context.service';
import { ContextNumbersTableComponent } from '../context-numbers-table/context-numbers-table.component';
import { ContextParametersTableComponent } from '../context-parameters-table/context-parameters-table.component';
@Component({
  selector: 'app-context-form',
  templateUrl: './context-form.component.html',
  styleUrls: ['./context-form.component.css']
})
export class ContextFormComponent {

  parameters: Array<Parameter> = [];
  phoneNumbers: Array<PhoneNumber> = [];
  environments: Array<Environment> = [];

  public model: Context = new Context(
    '', '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private contextService: ContextService,
    private environmentService: EnvironmentService,
    private parameterService: ParameterService,
    private phoneNumberService: NumberService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getContext(id)
    } else {
      this.newContext()
    }
  }

  @ViewChild(ContextParametersTableComponent, {static: false}) childRef1: ContextParametersTableComponent
  @ViewChild(ContextNumbersTableComponent, {static: false}) childRef2: ContextNumbersTableComponent
  submitted = false
  ngOnInit(): void {
    this.loadEnvironments()
    this.loadParameters()
    this.loadPhoneNumbers()
  }
  loadEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments=>this.environments = environments)
  }
  loadParameters(): void {
    this.parameterService.getParameters().subscribe(parameters=>this.parameters = parameters)
  }
  loadPhoneNumbers(): void {
    this.phoneNumberService.getNumbers().subscribe(numbers=>{this.phoneNumbers = numbers})
  }
  onSubmit() { 
    this.model.parameters = this.childRef1.dataSource
    this.model.phoneNumbers = this.childRef2.dataSource
    if(!this.model.id){
      this.contextService.addContext(this.model).subscribe(context => this.model = context)
    } else {
      this.contextService.updateContext(this.model).subscribe(context => {})
    }
    this.submitted = true; 
  }
  newContext() {
    this.model = new Context('', '');
    this.destroyParameters()
    this.destroyPhoneNumbers()
  }
  getContext(id:number): void {
    this.contextService.getContext(id).subscribe(context => {
      this.model = context
      if (context.parameters == null) {
        this.childRef1.dataSource = []
      } else {
        this.childRef1.dataSource = context.parameters
      }
      if (context.phoneNumbers == null) {
        this.childRef2.dataSource = []
      } else {
        this.childRef2.dataSource = context.phoneNumbers
      }
    })
  }
  editContext(id:number): void {
    this.contextService.getContext(id).subscribe(context => this.model = context)
    this.submitted = true; 
  }
  destroyParameters() {
    if (this.childRef1) {
      this.childRef1.ngOnDestroy();
    }
  }  
  destroyPhoneNumbers() {
    if (this.childRef2) {
      this.childRef2.ngOnDestroy();
    }
  }  
  goBack(){
    this.submitted = false; 
    this.getContext(this.model.id)
  }

}

import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Context } from 'src/app/model/context';
import { ContextService } from 'src/app/service/context/context.service';
import { Parameter } from '../../../model/parameter';
import { ParameterService } from '../../../service/parameter/parameter.service';
@Component({
  selector: 'app-parameter-form',
  templateUrl: './parameter-form.component.html',
  styleUrls: ['./parameter-form.component.css']
})
export class ParameterFormComponent {

  contexts: Array<Context> = [];

  public model: Parameter = new Parameter(
    '', ''
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private parameterService: ParameterService,
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getParameter(id);
    } else {
      this.newParameter();
    }
  }

  submitted = false;
  ngOnInit(): void {
  }
  onSubmit() { 
    if(!this.model.id){
      this.parameterService.addParameter(this.model).subscribe(parameter => this.model = parameter)
    } else {
      this.parameterService.updateParameter(this.model).subscribe(parameter => {
      })
    }
    this.submitted = true; 
  }
  newParameter() {
    this.model = new Parameter('', '');
  }
  getParameter(id:number): void {
    this.parameterService.getParameter(id).subscribe(parameter => this.model = parameter)
  }
  editParameter(id:number): void {
    this.parameterService.getParameter(id).subscribe(parameter => this.model = parameter)
    this.submitted = true; 
  }
  goBack(){
    this.submitted = false; 
    this.getParameter(this.model.id)
  }

}

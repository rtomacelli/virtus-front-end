import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/model/environment';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { Context } from '../../../model/context';
import { ContextService } from '../../../service/context/context.service';
@Component({
  selector: 'app-context-form',
  templateUrl: './context-form.component.html',
  styleUrls: ['./context-form.component.css']
})
export class ContextFormComponent {

  environments: Array<Environment> = [];

  public model: Context = new Context(
    '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private contextService: ContextService,
    private environmentService: EnvironmentService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getContext(id);
    } else {
      this.newContext();
    }
  }

  submitted = false;
  ngOnInit(): void {
    this.loadEnvironments();
  }
  loadEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments=>this.environments = environments);
  }
  onSubmit() { 
    if(!this.model.id){
      this.contextService.addContext(this.model).subscribe(context => this.model = context)
    } else {
      this.contextService.updateContext(this.model).subscribe(context => {
      })
    }
    this.submitted = true; 
  }
  newContext() {
    this.model = new Context('', '');
  }
  getContext(id:number): void {
    this.contextService.getContext(id).subscribe(context => this.model = context)
  }
  editContext(id:number): void {
    this.contextService.getContext(id).subscribe(context => this.model = context)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getContext(this.model.id)
  }

}

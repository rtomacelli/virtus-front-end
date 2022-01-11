import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '../../../model/environment';
import { EnvironmentService } from '../../../service/environment/environment.service';
@Component({
  selector: 'app-environment-form',
  templateUrl: './environment-form.component.html',
  styleUrls: ['./environment-form.component.css']
})
export class EnvironmentFormComponent {

  public model: Environment = new Environment(
    '', ''
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private environmentService: EnvironmentService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getEnvironment(id);
    } else {
      this.newEnvironment();
    }
  }

  submitted = false;
  ngOnInit(): void {
  }
  onSubmit() { 
    if(!this.model.id){
      this.environmentService.addEnvironment(this.model).subscribe(environment => this.model = environment)
    } else {
      this.environmentService.updateEnvironment(this.model).subscribe(environment => {
        // this.model = environment
        // console.log("onSubmit environment.id: "+environment.id)
      })
    }
    this.submitted = true; 
  }
  newEnvironment() {
    this.model = new Environment('', '');
  }
  getEnvironment(id:number): void {
    this.environmentService.getEnvironment(id).subscribe(environment => this.model = environment)
  }
  editEnvironment(id:number): void {
    this.environmentService.getEnvironment(id).subscribe(environment => this.model = environment)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getEnvironment(this.model.id)
  }

}

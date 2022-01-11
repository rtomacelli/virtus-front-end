import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from 'src/app/model/feature';
import { FeatureService } from 'src/app/service/feature/feature.service';
import { Step } from '../../../model/step';
import { StepService } from '../../../service/step/step.service';
@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.css']
})
export class StepFormComponent {

  features: Array<Feature> = [];

  public model: Step = new Step(
    '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private stepService: StepService,
    private featureService: FeatureService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getStep(id);
    } else {
      this.newStep();
    }
  }

  submitted = false;
  ngOnInit(): void {
    this.loadFeatures();
  }
  loadFeatures(): void {
    this.featureService.getFeatures().subscribe(features=>this.features = features);
  }
  onSubmit() { 
    if(!this.model.id){
      this.stepService.addStep(this.model).subscribe(step => this.model = step)
    } else {
      this.stepService.updateStep(this.model).subscribe(step => {
      })
    }
    this.submitted = true; 
  }
  newStep() {
    this.model = new Step('', '');
  }
  getStep(id:number): void {
    this.stepService.getStep(id).subscribe(step => this.model = step)
  }
  editStep(id:number): void {
    this.stepService.getStep(id).subscribe(step => this.model = step)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getStep(this.model.id)
  }

}

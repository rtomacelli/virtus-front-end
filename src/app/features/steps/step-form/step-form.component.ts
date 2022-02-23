import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Step } from '../../../model/step';
import { StepService } from '../../../service/step/step.service';
@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.css']
})
export class StepFormComponent {

  public model: Step = new Step(
    '', ''
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private stepService: StepService,
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

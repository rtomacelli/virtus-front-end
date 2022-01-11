import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from '../../../model/feature';
import { FeatureService } from '../../../service/feature/feature.service';
@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.css']
})
export class FeatureFormComponent {

  public model: Feature = new Feature(
    '', ''
  );
  
  constructor(
    private route: ActivatedRoute,    
    private featureService: FeatureService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getFeature(id);
    } else {
      this.newFeature();
    }
  }

  submitted = false;
  ngOnInit(): void {
  }
  onSubmit() { 
    if(!this.model.id){
      this.featureService.addFeature(this.model).subscribe(feature => this.model = feature)
    } else {
      this.featureService.updateFeature(this.model).subscribe(feature => {
      })
    }
    this.submitted = true; 
  }
  newFeature() {
    this.model = new Feature('', '');
  }
  getFeature(id:number): void {
    this.featureService.getFeature(id).subscribe(feature => this.model = feature)
  }
  editFeature(id:number): void {
    this.featureService.getFeature(id).subscribe(feature => this.model = feature)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getFeature(this.model.id)
  }

}

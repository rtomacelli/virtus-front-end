import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from 'src/app/model/environment';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { PhoneNumber } from '../../../model/phonenumber';
import { NumberService } from '../../../service/number/number.service';
@Component({
  selector: 'app-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.css']
})
export class NumberFormComponent {

  environments: Array<Environment> = [];

  public model: PhoneNumber = new PhoneNumber(
    '', '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private numberService: NumberService,
    private environmentService: EnvironmentService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getNumber(id);
    } else {
      this.newNumber();
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
      this.numberService.addNumber(this.model).subscribe(number => this.model = number)
    } else {
      this.numberService.updateNumber(this.model).subscribe(number => {
      })
    }
    this.submitted = true; 
  }
  newNumber() {
    this.model = new PhoneNumber('', '');
  }
  getNumber(id:number): void {
    this.numberService.getNumber(id).subscribe(number => this.model = number)
  }
  editNumber(id:number): void {
    this.numberService.getNumber(id).subscribe(number => this.model = number)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getNumber(this.model.id)
  }

}

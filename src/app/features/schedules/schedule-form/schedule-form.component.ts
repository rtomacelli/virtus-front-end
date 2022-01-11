import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user/user.service';
import { Schedule } from '../../../model/schedule';
import { ScheduleService } from '../../../service/schedule/schedule.service';
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent {

  users: Array<User> = [];

  public model: Schedule = new Schedule(
    '', '', 0
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private scheduleService: ScheduleService,
    private userService: UserService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getSchedule(id);
    } else {
      this.newSchedule();
    }
  }

  submitted = false;
  ngOnInit(): void {
    this.loadPowers();
  }
  loadPowers(): void {
    this.userService.getUsers().subscribe(users=>this.users = users);
  }
  onSubmit() { 
    if(!this.model.id){
      this.scheduleService.addSchedule(this.model).subscribe(schedule => this.model = schedule)
    } else {
      this.scheduleService.updateSchedule(this.model).subscribe(schedule => {
        // this.model = schedule
        // console.log("onSubmit schedule.id: "+schedule.id)
      })
    }
    this.submitted = true; 
  }
  newSchedule() {
    this.model = new Schedule('', '');
  }
  getSchedule(id:number): void {
    this.scheduleService.getSchedule(id).subscribe(schedule => this.model = schedule)
  }
  editSchedule(id:number): void {
    this.scheduleService.getSchedule(id).subscribe(schedule => this.model = schedule)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    this.getSchedule(this.model.id)
  }

}

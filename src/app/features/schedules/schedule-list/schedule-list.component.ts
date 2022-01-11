import { Component, OnInit } from '@angular/core'
import { Schedule } from 'src/app/model/schedule';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  schedules: Schedule[] = [];
  selectedSchedule?:Schedule;
  constructor(private scheduleService: ScheduleService, private messageService: MessageService) {}
  getSchedules(): void {
    this.scheduleService.getSchedules().subscribe(schedules=>this.schedules = schedules);
  }
  ngOnInit(): void {
    this.getSchedules();
  }
  onSelect(schedule:Schedule): void{
    this.selectedSchedule = schedule;
    this.messageService.add(`SchedulesComponent: Selected schedule id=${schedule.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.scheduleService.addSchedule({ name } as Schedule)
      .subscribe(schedule => {
        this.schedules.push(schedule);
      });
  }
  delete(schedule: Schedule): void {
    this.schedules = this.schedules.filter(h => h !== schedule);
    this.scheduleService.deleteSchedule(schedule.id).subscribe();
    
  }
}

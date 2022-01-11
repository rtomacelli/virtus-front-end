import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../model/schedule'
import { ScheduleService } from '../../../service/schedule/schedule.service';

@Component({
  selector: 'app-schedule-dashboard',
  templateUrl: './schedule-dashboard.component.html',
  styleUrls: [ './schedule-dashboard.component.css' ]
})
export class ScheduleDashboardComponent implements OnInit {
  schedules: Schedule[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.getSchedules();
  }

  getSchedules(): void {
    this.scheduleService.getSchedules()
      .subscribe(schedules => this.schedules = schedules.slice(0, 10));
  }
}

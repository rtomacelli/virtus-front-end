import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Schedule } from '../../../model/schedule';
import { ScheduleService } from '../../../service/schedule/schedule.service';

@Component({
  selector: 'app-schedule-search',
  templateUrl: './schedule-search.component.html',
  styleUrls: [ './schedule-search.component.css' ]
})
export class ScheduleSearchComponent implements OnInit {
  
  schedules$!: Observable<Schedule[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private scheduleService: ScheduleService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.schedules$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.scheduleService.searchSchedules(term)),
    );
  }
}

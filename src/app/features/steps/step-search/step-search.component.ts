import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Step } from '../../../model/step';
import { StepService } from '../../../service/step/step.service';

@Component({
  selector: 'app-step-search',
  templateUrl: './step-search.component.html',
  styleUrls: [ './step-search.component.css' ]
})
export class StepSearchComponent implements OnInit {
  
  steps$!: Observable<Step[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private stepService: StepService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.steps$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.stepService.searchSteps(term)),
    );
  }
}

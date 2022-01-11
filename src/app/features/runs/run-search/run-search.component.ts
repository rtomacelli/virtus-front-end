import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Run } from '../../../model/run';
import { RunService } from '../../../service/run/run.service';

@Component({
  selector: 'app-run-search',
  templateUrl: './run-search.component.html',
  styleUrls: [ './run-search.component.css' ]
})
export class RunSearchComponent implements OnInit {
  
  runs$!: Observable<Run[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private runService: RunService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.runs$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.runService.searchRuns(term)),
    );
  }
}

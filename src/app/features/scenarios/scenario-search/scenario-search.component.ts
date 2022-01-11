import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Scenario } from '../../../model/scenario';
import { ScenarioService } from '../../../service/scenario/scenario.service';

@Component({
  selector: 'app-scenario-search',
  templateUrl: './scenario-search.component.html',
  styleUrls: [ './scenario-search.component.css' ]
})
export class ScenarioSearchComponent implements OnInit {
  
  scenarios$!: Observable<Scenario[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private scenarioService: ScenarioService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.scenarios$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.scenarioService.searchScenarios(term)),
    );
  }
}

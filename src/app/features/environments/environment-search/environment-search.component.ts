import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Environment } from '../../../model/environment';
import { EnvironmentService } from '../../../service/environment/environment.service';

@Component({
  selector: 'app-environment-search',
  templateUrl: './environment-search.component.html',
  styleUrls: [ './environment-search.component.css' ]
})
export class EnvironmentSearchComponent implements OnInit {
  
  environments$!: Observable<Environment[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private environmentService: EnvironmentService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.environments$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.environmentService.searchEnvironments(term)),
    );
  }
}

import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Parameter } from '../../../model/parameter';
import { ParameterService } from '../../../service/parameter/parameter.service';

@Component({
  selector: 'app-parameter-search',
  templateUrl: './parameter-search.component.html',
  styleUrls: [ './parameter-search.component.css' ]
})
export class ParameterSearchComponent implements OnInit {
  
  parameters$!: Observable<Parameter[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private parameterService: ParameterService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.parameters$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.parameterService.searchParameters(term)),
    );
  }
}

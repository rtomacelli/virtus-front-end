import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { TestCase } from '../../../model/test-case';
import { TestCaseService } from '../../../service/test-case/test-case.service';

@Component({
  selector: 'app-test-case-search',
  templateUrl: './test-case-search.component.html',
  styleUrls: [ './test-case-search.component.css' ]
})
export class TestCaseSearchComponent implements OnInit {
  
  testCases$!: Observable<TestCase[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private testCaseService: TestCaseService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.testCases$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.testCaseService.searchTestCases(term)),
    );
  }
}

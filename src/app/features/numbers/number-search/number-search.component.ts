import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { PhoneNumber } from '../../../model/phonenumber';
import { NumberService } from '../../../service/number/number.service';

@Component({
  selector: 'app-number-search',
  templateUrl: './number-search.component.html',
  styleUrls: [ './number-search.component.css' ]
})
export class NumberSearchComponent implements OnInit {
  
  numbers$!: Observable<PhoneNumber[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private numberService: NumberService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.numbers$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.numberService.searchNumbers(term)),
    );
  }
}

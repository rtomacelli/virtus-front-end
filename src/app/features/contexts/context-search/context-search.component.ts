import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Context } from '../../../model/context';
import { ContextService } from '../../../service/context/context.service';

@Component({
  selector: 'app-context-search',
  templateUrl: './context-search.component.html',
  styleUrls: [ './context-search.component.css' ]
})
export class ContextSearchComponent implements OnInit {
  
  contexts$!: Observable<Context[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private contextService: ContextService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.contexts$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.contextService.searchContexts(term)),
    );
  }
}

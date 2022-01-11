import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Feature } from '../../../model/feature';
import { FeatureService } from '../../../service/feature/feature.service';

@Component({
  selector: 'app-feature-search',
  templateUrl: './feature-search.component.html',
  styleUrls: [ './feature-search.component.css' ]
})
export class FeatureSearchComponent implements OnInit {
  
  features$!: Observable<Feature[]>;
  
  private searchTerms = new Subject<string>();

  constructor(private featureService: FeatureService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.features$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.featureService.searchFeatures(term)),
    );
  }
}

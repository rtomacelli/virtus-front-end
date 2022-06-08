import { Component, Injectable, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

// https://stackoverflow.com/questions/57852645/angular-material-autocomplete-from-api
// https://stackblitz.com/edit/angular-wazyiq-xywdng?file=app%2Fautocomplete-simple-example.ts

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }

  opts = [];

  getData() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>('http://localhost:3000/usuarios').pipe(tap(data => this.opts = data))
  }
}

/**
 * @title Simple autocomplete
 */
 @Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css'],
})
export class AddOfficeComponent {

  @Input() officeObj = { nome: '', abreviatura: '', descricao: '', chefe_id: 0 };
  
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<any[]>;
  officeService: any;
  router: any;

  constructor(private service: Service) {
     this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(val || '')
       }) 
    )
   }

  ngOnInit() {
   
  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getData()
     .pipe(
       map(response => response.filter(option => { 
         return option.nome.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }  

   addOffice(data: any) {
    this.officeService.addOffice(this.officeObj).subscribe((data: {}) => {
      this.router.navigate(['/office/list']);
    });
  }

}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
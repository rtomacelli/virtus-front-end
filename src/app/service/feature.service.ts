import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class Feature {
name?: string;
code?: string;
description?: string;
author_id?: number;
created_at?: string;
id_versao_origem?: number;
status_id?: number;
}


export class FeatureService {

  endpoint = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getFeature(): Observable<Feature> {
    return this.httpClient
      .get<Feature>(this.endpoint + '/feature')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleFeature(id: any): Observable<Feature> {
    return this.httpClient
      .get<Feature>(this.endpoint + '/feature/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addFeature(data: any): Observable<Feature> {
    return this.httpClient
      .post<Feature>(
        this.endpoint + '/feature',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateFeature(id: any, data: any): Observable<Feature> {
    return this.httpClient
      .put<Feature>(
        this.endpoint + '/feature/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteFeature(id: any) {
    return this.httpClient
      .delete<Feature>(this.endpoint + '/feature/' + id, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }

}
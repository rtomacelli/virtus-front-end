import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Status {
name?: string;
description?: string;
author_id?: number;
created_at?: string;
id_versao_origem?: number;
status_id?: number;
stereotype?: string;
}

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  endpoint = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getStatus(): Observable<Status> {
    return this.httpClient
      .get<Status>(this.endpoint + '/status')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleStatus(id: any): Observable<Status> {
    return this.httpClient
      .get<Status>(this.endpoint + '/status/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addStatus(data: any): Observable<Status> {
    return this.httpClient
      .post<Status>(
        this.endpoint + '/status',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateStatus(id: any, data: any): Observable<Status> {
    return this.httpClient
      .put<Status>(
        this.endpoint + '/status/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteStatus(id: any) {
    return this.httpClient
      .delete<Status>(this.endpoint + '/status/' + id, this.httpHeader)
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

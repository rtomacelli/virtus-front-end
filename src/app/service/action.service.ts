import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class Action {

  name?: string;
  origin_status_id?: number;
  destination_status_id?: number;
  other_than?: boolean;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})


export class ActionService {

  endpoint = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAction(): Observable<Action> {
    return this.httpClient
      .get<Action>(this.endpoint + '/acoes')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleAction(id: any): Observable<Action> {
    return this.httpClient
      .get<Action>(this.endpoint + '/acoes/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addAction(data: any): Observable<Action> {
    return this.httpClient
      .post<Action>(
        this.endpoint + '/acoes',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateAction(id: any, data: any): Observable<Action> {
    return this.httpClient
      .put<Action>(
        this.endpoint + '/acoes/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteAction(id: any) {
    return this.httpClient
      .delete<Action>(this.endpoint + '/acoes/' + id, this.httpHeader)
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
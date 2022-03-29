import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../global-constants'

export class Action {

  name?: string;
  origin_status_id?: number;
  destination_status_id?: number;
  other_than?: boolean;
  description?: string;
  author_id?: number;
  created_at?: string;
  id_versao_origem?: number;
  status_id?: number;

}

@Injectable({
  providedIn: 'root'
})

export class ActionService {

  endpoint = GlobalConstants.apiURL;
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAction(): Observable<Action> {
    return this.httpClient
      .get<Action>(this.endpoint + '/action')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleAction(id: any): Observable<Action> {
    return this.httpClient
      .get<Action>(this.endpoint + '/action/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addAction(data: any): Observable<Action> {
    return this.httpClient
      .post<Action>(
        this.endpoint + '/action',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateAction(id: any, data: any): Observable<Action> {
    return this.httpClient
      .put<Action>(
        this.endpoint + '/action/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteAction(id: any) {
    return this.httpClient
      .delete<Action>(this.endpoint + '/action/' + id, this.httpHeader)
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
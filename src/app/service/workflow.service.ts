import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Workflow {
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

export class WorkflowService {
  endpoint = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getWorkflow(): Observable<Workflow> {
    return this.httpClient
      .get<Workflow>(this.endpoint + '/workflow')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleWorkflow(id: any): Observable<Workflow> {
    return this.httpClient
      .get<Workflow>(this.endpoint + '/workflow/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addWorkflow(data: any): Observable<Workflow> {
    return this.httpClient
      .post<Workflow>(
        this.endpoint + '/workflow',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateWorkflow(id: any, data: any): Observable<Workflow> {
    return this.httpClient
      .put<Workflow>(
        this.endpoint + '/workflow/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteWorkflow(id: any) {
    return this.httpClient
      .delete<Workflow>(this.endpoint + '/workflow/' + id, this.httpHeader)
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

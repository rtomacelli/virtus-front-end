import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';
export class Status {
  name?: string;
  description?: string;
  stereotype?: string;
}

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  /*/
  endpoint = GlobalConstants.finalApiURL;
	/*/
  endpoint = GlobalConstants.testApiURL;
  //*/

  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getStatus(): Observable<Status> {
    return this.httpClient
      .get<Status>(this.endpoint + '/estados')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleStatus(id: any): Observable<Status> {
    return this.httpClient
      .get<Status>(this.endpoint + '/estados/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addStatus(data: any): Observable<Status> {
    return this.httpClient
      .post<Status>(
        this.endpoint + '/estados',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateStatus(id: any, data: any): Observable<Status> {
    return this.httpClient
      .put<Status>(
        this.endpoint + '/estados/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteStatus(id: any) {
    return this.httpClient
      .delete<Status>(this.endpoint + '/estados/' + id, this.httpHeader)
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

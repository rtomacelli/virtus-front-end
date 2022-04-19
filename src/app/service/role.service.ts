import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../global-constants';

export class Role {

  id?: number;
  name?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  endpoint = GlobalConstants.apiURL;
  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getRoles(): Observable<Role> {
    return this.httpClient
      .get<Role>(this.endpoint + '/role/list')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleRole(id: any): Observable<Role> {
    return this.httpClient
      .get<Role>(this.endpoint + '/role/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addRole(data: any): Observable<Role> {
    return this.httpClient
      .post<Role>(
        this.endpoint + '/role',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateRole(id: any, data: any): Observable<Role> {
    return this.httpClient
      .put<Role>(
        this.endpoint + '/role/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteRole(id: any) {
    return this.httpClient
      .delete<Role>(this.endpoint + '/role/' + id, this.httpHeader)
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
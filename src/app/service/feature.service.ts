import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export class Feature {
  name?: string;
  code?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FeatureService {

  endpoint = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getFeature(): Observable<Feature> {
    return this.httpClient
      .get<Feature>(this.endpoint + '/funcionalidades')
      .pipe(retry(1), catchError(this.processError));
  }

  getSingleFeature(id: any): Observable<Feature> {
    return this.httpClient
      .get<Feature>(this.endpoint + '/funcionalidades/' + id)
      .pipe(retry(1), catchError(this.processError));
  }

  addFeature(data: any): Observable<Feature> {
    return this.httpClient
      .post<Feature>(
        this.endpoint + '/funcionalidades',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateFeature(id: any, data: any): Observable<Feature> {
    return this.httpClient
      .put<Feature>(
        this.endpoint + '/funcionalidades/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteFeature(id: any) {
    return this.httpClient
      .delete<Feature>(this.endpoint + '/funcionalidades/' + id, this.httpHeader)
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
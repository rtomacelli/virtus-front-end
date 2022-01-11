import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Parameter } from 'src/app/model/parameter';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private parametersUrl = 'api/parameter';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getParameters(): Observable<Parameter[]> {
    return this.http.get<Parameter[]>(this.parametersUrl)
      .pipe(
        catchError(this.handleError<Parameter[]>("getParameters", []))
      )
  }

  addParameter(parameter: Parameter): Observable<Parameter> {
    console.log("addParameter: "+parameter.name)
    return this.http.post<Parameter>(this.parametersUrl, parameter, this.httpOptions).pipe(
      tap((newParameter: Parameter) => this.log(`added parameter w/ id=${newParameter.id}`)),
      catchError(this.handleError<Parameter>("addParameter"))
    );
  }

  getParameter(id: number): Observable<Parameter> {
    const url = `${this.parametersUrl}/${id}`;
    return this.http.get<Parameter>(url).pipe(
      tap(_ => this.log(`fetched parameter id=${id}`)),
      catchError(this.handleError<Parameter>(`getParameter id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateParameter(parameter: Parameter): Observable<any> {
    return this.http.put(this.parametersUrl, parameter, this.httpOptions).pipe(
      tap(_ => this.log(`updated parameter id=${parameter.id}`)),
      catchError(this.handleError<any>('updateParameter'))
    );
  }

  deleteParameter(id: number): Observable<Parameter> {
    const url = `${this.parametersUrl}/${id}`;
    return this.http.delete<Parameter>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted parameter id=${id}`)),
      catchError(this.handleError<Parameter>('deleteParameter'))
    );
  }

  searchParameters(term: string): Observable<Parameter[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Parameter[]>(`${this.parametersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found parameters matching "${term}"`) :
        this.log(`no parameters matching "${term}"`)),
      catchError(this.handleError<Parameter[]>('searchParameters', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ParameterService: ${message}`);
  }
}

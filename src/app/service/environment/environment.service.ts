import { Injectable } from '@angular/core';
import { Environment } from '../../model/environment';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };
  private environmentsUrl = 'http://localhost:5000/environment';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getEnvironments(): Observable<Environment[]> {
    return this.http.get<Environment[]>(this.environmentsUrl)
      .pipe(
        catchError(this.handleError<Environment[]>("getEnvironments", []))
      )
  }

  addEnvironment(environment: Environment): Observable<Environment> {
    console.log("addEnvironment: "+environment.name)
    return this.http.post<Environment>(this.environmentsUrl, environment).pipe(
      tap((newEnvironment: Environment) => this.log(`added environment w/ id=${newEnvironment.id}`)),
      catchError(this.handleError<Environment>("addEnvironment"))
    );
  }

  getEnvironment(id: number): Observable<Environment> {
    const url = `${this.environmentsUrl}/${id}`;
    return this.http.get<Environment>(url).pipe(
      tap(_ => this.log(`fetched environment id=${id}`)),
      catchError(this.handleError<Environment>(`getEnvironment id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateEnvironment(environment: Environment): Observable<any> {
    return this.http.put(this.environmentsUrl, environment).pipe(
      tap(_ => this.log(`updated environment id=${environment.id}`)),
      catchError(this.handleError<any>('updateEnvironment'))
    );
  }

  deleteEnvironment(id: number): Observable<Environment> {
    const url = `${this.environmentsUrl}/${id}`;
    return this.http.delete<Environment>(url).pipe(
      tap(_ => this.log(`deleted environment id=${id}`)),
      catchError(this.handleError<Environment>('deleteEnvironment'))
    );
  }

  searchEnvironments(term: string): Observable<Environment[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Environment[]>(`${this.environmentsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found environments matching "${term}"`) :
        this.log(`no environments matching "${term}"`)),
      catchError(this.handleError<Environment[]>('searchEnvironments', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`EnvironmentService: ${message}`);
  }
}

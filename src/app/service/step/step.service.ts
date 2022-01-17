import { Injectable } from '@angular/core';
import { Step } from '../../model/step';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };
  private stepsUrl = 'http://localhost:5000/step';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getSteps(): Observable<Step[]> {
    return this.http.get<Step[]>(this.stepsUrl)
      .pipe(
        catchError(this.handleError<Step[]>("getSteps", []))
      )
  }

  addStep(step: Step): Observable<Step> {
    console.log("addStep: "+step.name)
    return this.http.post<Step>(this.stepsUrl, step).pipe(
      tap((newStep: Step) => this.log(`added step w/ id=${newStep.id}`)),
      catchError(this.handleError<Step>("addStep"))
    );
  }

  getStep(id: number): Observable<Step> {
    const url = `${this.stepsUrl}/${id}`;
    return this.http.get<Step>(url).pipe(
      tap(_ => this.log(`fetched step id=${id}`)),
      catchError(this.handleError<Step>(`getStep id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateStep(step: Step): Observable<any> {
    return this.http.put(this.stepsUrl, step).pipe(
      tap(_ => this.log(`updated step id=${step.id}`)),
      catchError(this.handleError<any>('updateStep'))
    );
  }

  deleteStep(id: number): Observable<Step> {
    const url = `${this.stepsUrl}/${id}`;
    return this.http.delete<Step>(url).pipe(
      tap(_ => this.log(`deleted step id=${id}`)),
      catchError(this.handleError<Step>('deleteStep'))
    );
  }

  searchSteps(term: string): Observable<Step[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Step[]>(`${this.stepsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found steps matching "${term}"`) :
        this.log(`no steps matching "${term}"`)),
      catchError(this.handleError<Step[]>('searchSteps', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`StepService: ${message}`);
  }
}

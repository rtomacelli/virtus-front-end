import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TestCase } from 'src/app/model/test-case';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };
  private testCasesUrl = 'http://localhost:5002/testCase';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTestCases(): Observable<TestCase[]> {
    return this.http.get<TestCase[]>(this.testCasesUrl)
      .pipe(
        catchError(this.handleError<TestCase[]>("getTestCases", []))
      )
  }

  addTestCase(testCase: TestCase): Observable<TestCase> {
    console.log("addTestCase: "+testCase.name)
    const data = JSON.stringify(testCase);
    return this.http.post<TestCase>(this.testCasesUrl, data).pipe(
      tap((newTestCase: TestCase) => this.log(`added testCase w/ id=${newTestCase.id}`)),
      catchError(this.handleError<TestCase>("addTestCase"))
    );
  }

  getTestCase(id: number): Observable<TestCase> {
    const url = `${this.testCasesUrl}/${id}`;
    return this.http.get<TestCase>(url).pipe(
      tap(_ => this.log(`fetched testCase id=${id}`)),
      catchError(this.handleError<TestCase>(`getTestCase id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateTestCase(testCase: TestCase): Observable<any> {
    console.log("updateTestCase: "+testCase.name)
    const data = JSON.stringify(testCase);
    return this.http.put(this.testCasesUrl, data).pipe(
      tap(_ => this.log(`updated testCase id=${testCase.id}`)),
      catchError(this.handleError<any>('updateTestCase'))
    );
  }

  deleteTestCase(id: number): Observable<TestCase> {
    const url = `${this.testCasesUrl}/${id}`;
    return this.http.delete<TestCase>(url).pipe(
      tap(_ => this.log(`deleted testCase id=${id}`)),
      catchError(this.handleError<TestCase>('deleteTestCase'))
    );
  }

  searchTestCases(term: string): Observable<TestCase[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<TestCase[]>(`${this.testCasesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found testCases matching "${term}"`) :
        this.log(`no testCases matching "${term}"`)),
      catchError(this.handleError<TestCase[]>('searchTestCases', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`TestCaseService: ${message}`);
  }
}

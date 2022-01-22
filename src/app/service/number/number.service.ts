import { Injectable } from '@angular/core';
import { PhoneNumber } from '../../model/phonenumber';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NumberService {
  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };
  private numbersUrl = 'http://localhost:5002/number';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getNumbers(): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>(this.numbersUrl)
      .pipe(
        catchError(this.handleError<PhoneNumber[]>("getNumbers", []))
      )
  }

  addNumber(number: PhoneNumber): Observable<PhoneNumber> {
    console.log("addNumber: "+number.name)
    return this.http.post<PhoneNumber>(this.numbersUrl, number).pipe(
      tap((newNumber: PhoneNumber) => this.log(`added number w/ id=${newNumber.id}`)),
      catchError(this.handleError<PhoneNumber>("addNumber"))
    );
  }

  getNumber(id: number): Observable<PhoneNumber> {
    const url = `${this.numbersUrl}/${id}`;
    return this.http.get<PhoneNumber>(url).pipe(
      tap(_ => this.log(`fetched number id=${id}`)),
      catchError(this.handleError<PhoneNumber>(`getNumber id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateNumber(number: PhoneNumber): Observable<any> {
    return this.http.put(this.numbersUrl, number).pipe(
      tap(_ => this.log(`updated number id=${number.id}`)),
      catchError(this.handleError<any>('updateNumber'))
    );
  }

  deleteNumber(id: number): Observable<PhoneNumber> {
    const url = `${this.numbersUrl}/${id}`;
    return this.http.delete<PhoneNumber>(url).pipe(
      tap(_ => this.log(`deleted number id=${id}`)),
      catchError(this.handleError<PhoneNumber>('deleteNumber'))
    );
  }

  searchNumbers(term: string): Observable<PhoneNumber[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<PhoneNumber[]>(`${this.numbersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found numbers matching "${term}"`) :
        this.log(`no numbers matching "${term}"`)),
      catchError(this.handleError<PhoneNumber[]>('searchNumbers', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`NumberService: ${message}`);
  }
}

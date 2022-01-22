import { Injectable } from '@angular/core';
import { Schedule } from '../../model/schedule';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };
  private schedulesUrl = 'http://localhost:5002/schedule';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserService) { }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.schedulesUrl)
      .pipe(
        catchError(this.handleError<Schedule[]>("getSchedules", []))
      )
  }

  addSchedule(schedule: Schedule): Observable<Schedule> {
    console.log("addSchedule: "+schedule.name)
    return this.http.post<Schedule>(this.schedulesUrl, schedule).pipe(
      tap((newSchedule: Schedule) => this.log(`added schedule w/ id=${newSchedule.id}`)),
      catchError(this.handleError<Schedule>("addSchedule"))
    );
  }

  getSchedule(id: number): Observable<Schedule> {
    const url = `${this.schedulesUrl}/${id}`;
    return this.http.get<Schedule>(url).pipe(
      tap(_ => this.log(`fetched schedule id=${id}`)),
      catchError(this.handleError<Schedule>(`getSchedule id=${id}`))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log("${operation} failed: ${error.message}");
      return of(result as T);
    };
  }

  updateSchedule(schedule: Schedule): Observable<any> {
    return this.http.put(this.schedulesUrl, schedule).pipe(
      tap(_ => this.log(`updated schedule id=${schedule.id}`)),
      catchError(this.handleError<any>('updateSchedule'))
    );
  }

  deleteSchedule(id: number): Observable<Schedule> {
    const url = `${this.schedulesUrl}/${id}`;
    return this.http.delete<Schedule>(url).pipe(
      tap(_ => this.log(`deleted schedule id=${id}`)),
      catchError(this.handleError<Schedule>('deleteSchedule'))
    );
  }

  searchSchedules(term: string): Observable<Schedule[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Schedule[]>(`${this.schedulesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found schedules matching "${term}"`) :
        this.log(`no schedules matching "${term}"`)),
      catchError(this.handleError<Schedule[]>('searchSchedules', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`ScheduleService: ${message}`);
  }
}

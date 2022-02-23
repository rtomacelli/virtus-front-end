import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RunSingleFormComponent } from "../runs/run-single-form/run-single-form.component"

@Component({
  selector: 'circle-progress-dialog',
  templateUrl: 'circle-progress-dialog.html',
})
export class CircleProgressDialog implements OnDestroy {
  public executed: boolean
  time: string = "00:00:00"
  constructor(public dialogRef: MatDialogRef<CircleProgressDialog>, 
  @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: CircleProgressDialog) {
    this.startTimer()
  }
  ngOnDestroy(): void {
    this.startTimer()
  }
  running: boolean = false
  timerRef: any
  second: number = 1
  minute: number = 0
  hour: number = 0
  public startTimer():string {
    this.running = !this.running;
    if (this.running) {
      this.timerRef = setInterval(() => { 
        if (this.second == 60) {
          this.minute++
          this.second = 0
        }
        if (this.minute == 60) {
          this.hour++
          this.minute = 0
        }
        let padToSecond = (this.second < 10) ? "0" + this.second : this.second
        let padToMinute = (this.minute < 10) ? "0" + this.minute : this.minute
        let padToHour = (this.hour < 10) ? "0" + this.hour : this.hour
        this.time = padToHour + ":" + padToMinute + ":" + padToSecond               
        this.second++
      },1000);
      return ""
    } else {
     return this.time;
    }
  }
}
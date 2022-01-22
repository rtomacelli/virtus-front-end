import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RunSingleFormComponent } from "../run-single-form.component"

@Component({
  selector: 'circle-progress-dialog',
  templateUrl: 'circle-progress-dialog.html',
})
export class CircleProgressDialog {
  public executed: boolean
  constructor(public dialogRef: MatDialogRef<CircleProgressDialog>) { }
}
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog-box',
  templateUrl: './message-dialog-box.component.html',
  styleUrls: ['./message-dialog-box.component.css']
})
export class MessageDialogBoxComponent implements OnInit {
  msg: string;

  constructor(
    public dialogRef: MatDialogRef<MessageDialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: MessageDialogBoxComponent
  ) {
    this.msg = dialogData.msg
  }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
  }

}

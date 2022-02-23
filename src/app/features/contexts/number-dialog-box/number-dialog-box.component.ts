import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneNumber } from 'src/app/model/phonenumber';
export interface PhoneNumberDialogData {
  action: string;
  selectedNumber:PhoneNumber
  phoneNumbers:PhoneNumber[]
}
@Component({
  selector: 'app-number-dialog-box',
  templateUrl: './number-dialog-box.component.html',
  styleUrls: ['./number-dialog-box.component.css']
})
export class NumberDialogBox implements OnInit {
  phoneNumbers: PhoneNumber[]
  selectedNumber: PhoneNumber
  action: string
  id:number
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<NumberDialogBox>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: PhoneNumberDialogData
  ) {
    this.phoneNumbers = dialogData.phoneNumbers
    this.action = dialogData.action
    if (dialogData.selectedNumber) {
      this.selectedNumber = dialogData.selectedNumber
      this.selectedNumber.position = dialogData.selectedNumber.position
      console.log('dialogData: ' + dialogData)
      console.log('dialogData.selectedNumber: ' + dialogData.selectedNumber)
      console.log('dialogData.selectedNumber.position: ' + dialogData.selectedNumber.position)
      console.log('this.selectedNumber.position: ' + this.selectedNumber.position)
    }
  }

  doAction() {
    if (this.action == 'Add') {
      this.selectedNumber = this.phoneNumbers.filter(value => { return value.id == this.selectedNumber.id })[0]
    } else if (this.action == 'Update') {
      let position = this.selectedNumber.position
      this.selectedNumber = this.phoneNumbers.filter(value => { return value.id == this.selectedNumber.id })[0]
      this.selectedNumber.position = position
    }
    this.dialogRef.close({ event: this.action, data: this.selectedNumber });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel', data: this.selectedNumber });
  }

}

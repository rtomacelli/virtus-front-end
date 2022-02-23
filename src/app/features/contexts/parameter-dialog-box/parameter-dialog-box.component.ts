import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parameter } from 'src/app/model/parameter';
export interface ParameterDialogData {
  action: string;
  selectedParameter:Parameter
  parameters:Parameter[]
}
@Component({
  selector: 'app-parameter-dialog-box',
  templateUrl: './parameter-dialog-box.component.html',
  styleUrls: ['./parameter-dialog-box.component.css']
})
export class ParameterDialogBox implements OnInit {
  parameters: Parameter[]
  selectedParameter: Parameter
  action: string
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<ParameterDialogBox>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: ParameterDialogData
    ) {
      this.parameters = dialogData.parameters
      this.action = dialogData.action
      if(dialogData.selectedParameter){
        this.selectedParameter = dialogData.selectedParameter
        this.selectedParameter.position = dialogData.selectedParameter.position
        console.log('dialogData: ' + dialogData)
        console.log('dialogData.selectedParameter: ' + dialogData.selectedParameter)
        console.log('dialogData.selectedParameter.position: ' + dialogData.selectedParameter.position)
        console.log('this.selectedParameter.position: ' + this.selectedParameter.position)
      }
  }

  doAction(){
    if(this.action == 'Add'){
      this.selectedParameter = this.parameters.filter(value=>{return value.id == this.selectedParameter.id} )[0]
    } else if (this.action == 'Update'){
      let position = this.selectedParameter.position
      this.selectedParameter = this.parameters.filter(value=>{return value.id == this.selectedParameter.id} )[0]
      this.selectedParameter.position = position
    }
    this.dialogRef.close({event:this.action,data:this.selectedParameter});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel',data:this.selectedParameter});
  }

}

import { Component, Inject, Optional,OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Scenario } from 'src/app/model/scenario';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
export interface SelectDialogData {
  action: string;
  selectedScenario:Scenario
  scenarios:Scenario[]
}
@Component({
  selector: 'app-scenario-dialog-box',
  templateUrl: './scenario-dialog-box.component.html',
  styleUrls: ['./scenario-dialog-box.component.css']
})
export class ScenarioDialogBoxComponent implements OnInit {
  
  scenarios: Scenario[]
  selectedScenario: Scenario
  action: string
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<ScenarioDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: SelectDialogData
    ) {
      this.scenarios = dialogData.scenarios
      this.action = dialogData.action
      this.selectedScenario = dialogData.selectedScenario
  }

  doAction(){
    this.selectedScenario = this.scenarios.filter(s=>{return s.id == this.selectedScenario.id})[0]
    this.dialogRef.close({event:this.action,data:this.selectedScenario});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel',data:this.scenarios.filter(s=>{return s.id == this.selectedScenario.id})});
  }

}
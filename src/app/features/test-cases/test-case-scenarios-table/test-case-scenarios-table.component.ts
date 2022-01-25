//app.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioDialogBoxComponent } from '../scenario-dialog-box/scenario-dialog-box.component';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { Scenario } from 'src/app/model/scenario';

@Component({
  selector: 'app-test-case-scenarios-table',
  templateUrl: './test-case-scenarios-table.component.html',
  styleUrls: ['./test-case-scenarios-table.component.css']
})
export class TestCaseScenariosTableComponent implements OnInit {
  ngOnDestroy() {
    this.dataSource = []
  }
  displayedColumns: string[] = ['id', 'name', 'action']
  scenarios: Scenario[]

  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  dataSource: Scenario[] = []
  selectedScenario: Scenario
  action: string

  constructor(public dialog: MatDialog, private scenarioService: ScenarioService) { }
  ngOnInit(): void {
    this.scenarioService.getScenarios().subscribe(scenarios => {      
      this.scenarios = scenarios
      console.log(this.scenarios)
    })
  }

  openRunDialog(selectedScenario) {
  }
  openDialog(action, selectedScenario) {
    const dialogRef = this.dialog.open(ScenarioDialogBoxComponent, {
      width: '250px',
      data: { selectedScenario: selectedScenario, scenarios: this.scenarios, action: action }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        console.log('Add result.data: ')
        console.log(result.data.id)
        console.log(result.data.name)
        console.log(result.data.description)
        console.log(result.data.listOfSteps)        
        console.log(result.data.position)        
        this.addRowData(result.data)
      } else if (result.event == 'Update') {
        this.updateRowData(result.data)
      } else if (result.event == 'Delete') {
        console.log('Delete result.data: ')
        console.log(result.data.id)
        console.log(result.data.name)
        console.log(result.data.description)
        console.log(result.data.listOfSteps)        
        console.log(result.data.position)        
        this.deleteRowData(result.data)
      }
    });
  }

  addRowData(row_obj: Scenario) {
    if(!this.dataSource){
      this.dataSource = []
    }
    console.log("Add Row")
    console.log("id: "+ row_obj.id)
    console.log("description: "+ row_obj.description)
    console.log("listOfSteps: "+ row_obj.listOfSteps)
    console.log("position: "+ row_obj.position)
    this.dataSource.push({
      id: row_obj.id,
      name: row_obj.name,
      description: row_obj.description,
      listOfSteps: row_obj.listOfSteps,
      position: ''+this.dataSource.length
    });
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id && value.position == row_obj.position) {
        value.name = row_obj.name
        value.description = row_obj.description
        value.listOfSteps = row_obj.listOfSteps
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    if(!this.dataSource){
      this.dataSource = []
    } else {
      this.dataSource = this.dataSource.filter((value) => {
        console.log("ids: "+value.id + ' - '+ row_obj.id)
        console.log("positions: "+value.position +' - '+ row_obj.position)
        let ret1 = value.id != row_obj.id 
        let ret2 = value.position != row_obj.position 
        console.log("ret1: "+ret1)
        console.log("ret2: "+ret2)
        let ret = ret1 || ret2
        return ret 
      });
      this.dataSource.forEach(function(element, index){element.position = ''+index})
      console.log(this.dataSource)
    }
  }

  move(direction, element): void {
    let fromIndex = this.dataSource.indexOf(element)
    let toIndex = 0
    if ('Up' == direction) {
      toIndex = fromIndex - 1
    } else if ('Down' == direction) {
      toIndex = fromIndex + 1
    } else if ('First' == direction) {
      toIndex = 0
    } else if ('Last' == direction) {
      toIndex = this.dataSource.length - 1
    }
    if (-1 == toIndex) {
      toIndex = this.dataSource.length - 1
    } else if (toIndex == this.dataSource.length) {
      toIndex = 0
    }
    this.dataSource.splice(fromIndex, 1)
    this.dataSource.splice(toIndex, 0, element)
    this.dataSource.forEach(function(element, index){element.position = ''+index})
    this.table.renderRows();
    console.log(this.dataSource)
  }
  log(txt: string): void {
    console.log(txt)
  }
}
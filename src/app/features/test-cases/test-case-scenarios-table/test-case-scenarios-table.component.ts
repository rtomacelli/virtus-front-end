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
  displayedColumns: string[] = ['id', 'name', 'action']
  scenarios: Scenario[]

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource: Scenario[]=[]
  selectedScenario: Scenario
  action: string

  constructor(public dialog: MatDialog, private scenarioService: ScenarioService) { }
  ngOnInit(): void {
    this.scenarioService.getScenarios().subscribe(scenarios => this.scenarios = scenarios)
  }

  openDialog(action, selectedScenario) {
    const dialogRef = this.dialog.open(ScenarioDialogBoxComponent, {
      width: '250px',
      data: { selectedScenario: selectedScenario, scenarios: this.scenarios, action: action }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data)
      } else if (result.event == 'Update') {
        this.updateRowData(result.data)
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data)
      }
    });
  }

  addRowData(row_obj:Scenario) {
    this.dataSource.push({
      id: row_obj.id,
      name: row_obj.name,
      description: '',
      listOfSteps: '',
    });
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id != row_obj.id
    });
  }
}
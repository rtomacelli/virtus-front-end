//app.component.ts
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioDialogBoxComponent } from '../scenario-dialog-box/scenario-dialog-box.component';
import { ScenarioService } from 'src/app/service/scenario/scenario.service';
import { Scenario } from 'src/app/model/scenario';
import { MessageDialogBoxComponent } from '../../message-dialog-box/message-dialog-box.component';
import { Run } from 'src/app/model/run';
import { RunService } from 'src/app/service/run/run.service';
import { CircleProgressDialog } from '../../circle-progress-dialog/circle-progress-dialog';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-test-case-scenarios-table',
  templateUrl: './test-case-scenarios-table.component.html',
  styleUrls: ['./test-case-scenarios-table.component.css']
})
export class TestCaseScenariosTableComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'action']
  scenarios: Scenario[]
  testRun: Run

  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  dataSource = new MatTableDataSource<Scenario>([])
  selection = new SelectionModel<Scenario>(true, []);
  selectedScenario: Scenario
  action: string
  dialogRef: any
  environmentId?: string
  contextId?: string

  @Input() environment
  @Input() context
  constructor(
    public dialog: MatDialog,
    private scenarioService: ScenarioService,
    private runService: RunService
  ) {
    this.environmentId = this.environment
    this.contextId = this.context
  }
  ngOnDestroy(): void {
    this.dataSource = new MatTableDataSource<Scenario>([])
  }
  ngOnInit(): void {
    this.scenarioService.getScenarios().subscribe(scenarios => {
      this.scenarios = scenarios
    })
  }

  run(element) {
    if (!this.context || this.context == '') {
      const dialogRef = this.dialog.open(MessageDialogBoxComponent, {
        width: '250px',
        data: { msg: 'Please, first provide an environment and a context in the TestCase.' }
      })
    } else {
      this.openRunDialog()
      this.selectedScenario = element
      let scenarioId = '' + this.selectedScenario.id
      let name = this.selectedScenario.name
      let listOfSteps = this.selectedScenario.listOfSteps
      let newRun = new Run(name, scenarioId, listOfSteps, '', '', '', '' + this.environmentId, '' + this.contextId)
      this.runService.run(newRun).subscribe(run => {
        element.result = run.result
        this.dialogRef.close();
        newRun.logs = run.logs
      })
    }
  }
  openRunDialog() {
    this.dialogRef = this.dialog.open(CircleProgressDialog, {
      width: '250px'
    })
  }
  openDialog(action, selectedScenario) {
    const dialogRef = this.dialog.open(ScenarioDialogBoxComponent, {
      width: '250px',
      data: { selectedScenario: selectedScenario, scenarios: this.scenarios, action: action }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        result.data.position = this.dataSource.data.length
        this.addRowData(result.data)
      } else if (result.event == 'Update') {
        this.updateRowData(result.data)
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data)
      }
    });
  }

  addRowData(row_obj: Scenario) {
    if (!this.dataSource) {
      this.dataSource.data = []
    }
    this.dataSource.data.push({
      id: row_obj.id,
      name: row_obj.name,
      description: row_obj.description,
      listOfSteps: row_obj.listOfSteps,
      position: '' + this.dataSource.data.length
    });
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    this.dataSource.data.forEach((value, key) => {
      console.log('value.position == row_obj.position ' + (key == row_obj.position))
      if (key == row_obj.position) {
        value.id = row_obj.id
        value.name = row_obj.name
        value.description = row_obj.description
        value.listOfSteps = row_obj.listOfSteps
        value.position = row_obj.position
      }
    });
    this.table.renderRows();
  }
  deleteRowData(row_obj) {
    if (!this.dataSource) {
      this.dataSource.data = []
    } else {
      this.dataSource.data = this.dataSource.data.filter((value) => {
        let ret1 = value.id != row_obj.id
        let ret2 = value.position != row_obj.position
        let ret = ret1 || ret2
        return ret
      });
      this.dataSource.data.forEach(function (element, index) { element.position = '' + index })
      console.log(this.dataSource)
    }
  }

  move(direction, element): void {
    let fromIndex = this.dataSource.data.indexOf(element)
    let toIndex = 0
    if ('Up' == direction) {
      toIndex = fromIndex - 1
    } else if ('Down' == direction) {
      toIndex = fromIndex + 1
    } else if ('First' == direction) {
      toIndex = 0
    } else if ('Last' == direction) {
      toIndex = this.dataSource.data.length - 1
    }
    if (-1 == toIndex) {
      toIndex = this.dataSource.data.length - 1
    } else if (toIndex == this.dataSource.data.length) {
      toIndex = 0
    }
    this.dataSource.data.splice(fromIndex, 1)
    this.dataSource.data.splice(toIndex, 0, element)
    this.dataSource.data.forEach(function (element, index) { element.position = '' + index })
    this.table.renderRows();
    console.log(this.dataSource)
  }
  log(txt: string): void {
    console.log(txt)
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }  
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
  }
}
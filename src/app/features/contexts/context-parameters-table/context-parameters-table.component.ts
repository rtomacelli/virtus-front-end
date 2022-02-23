import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Parameter } from 'src/app/model/parameter';
import { ParameterService } from 'src/app/service/parameter/parameter.service';
import { ParameterDialogBox } from '../parameter-dialog-box/parameter-dialog-box.component';

@Component({
  selector: 'app-context-parameters-table',
  templateUrl: './context-parameters-table.component.html',
  styleUrls: ['./context-parameters-table.component.css']
})
export class ContextParametersTableComponent implements OnInit {
  ngOnDestroy() {
    this.dataSource = []
  }
  displayedColumns: string[] = ['id','name','value','action']
  parameters: Parameter[]
  dialogRef: any;
  ngOnInit(): void {
    this.parameterService.getParameters().subscribe(parameters => {
      this.parameters = parameters
    })        
  }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  dataSource: Parameter[] = []
  constructor(
    public dialog: MatDialog,
    private parameterService: ParameterService,
  ){}

  openDialog(action, selectedParameter) {
    const dialogRef = this.dialog.open(ParameterDialogBox, {
      width: '250px',
      data: { selectedParameter: selectedParameter, parameters: this.parameters, action: action }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        result.data.position = this.dataSource.length
        this.addRowData(result.data)
      } else if (result.event == 'Update') {
        this.updateRowData(result.data)
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data)
      }
    });
  }
  
  addRowData(row_obj: Parameter) {
    if (!this.dataSource) {
      this.dataSource = []
    }
    this.dataSource.push({
      id: row_obj.id,
      name: row_obj.name,
      description: row_obj.description,
      contextId: row_obj.contextId,
      contextName: row_obj.contextName,
      value: row_obj.value,
      position: '' + this.dataSource.length
    });
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    this.dataSource.forEach((value, key) => {
      if (key == row_obj.position) {
        value.id = row_obj.id
        value.name = row_obj.name
        value.description = row_obj.description
        value.contextId = row_obj.contextId
        value.contextName = row_obj.contextName
        value.value = row_obj.value
        value.position = row_obj.position
      }
    });
    this.table.renderRows();
  }
  deleteRowData(row_obj) {
    if (!this.dataSource) {
      this.dataSource = []
    } else {
      this.dataSource = this.dataSource.filter((value) => {
        let ret1 = value.id != row_obj.id
        let ret2 = value.position != row_obj.position
        let ret = ret1 || ret2
        return ret
      });
      this.dataSource.forEach(function (element, index) { element.position = '' + index })
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
    this.dataSource.forEach(function (element, index) { element.position = '' + index })
    this.table.renderRows();
    console.log(this.dataSource)
  }
  log(txt: string): void {
    console.log(txt)
  }
}

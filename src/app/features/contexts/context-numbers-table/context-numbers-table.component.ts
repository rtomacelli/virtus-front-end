import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PhoneNumber } from 'src/app/model/phonenumber';
import { NumberService } from 'src/app/service/number/number.service';
import { NumberDialogBox } from '../number-dialog-box/number-dialog-box.component';

@Component({
  selector: 'app-context-numbers-table',
  templateUrl: './context-numbers-table.component.html',
  styleUrls: ['./context-numbers-table.component.css']
})
export class ContextNumbersTableComponent implements OnInit {
  ngOnDestroy() {
    this.dataSource = []
  }
  displayedColumns: string[] = ['id', 'phoneNumber', 'alias', 'action']
  phoneNumbers: PhoneNumber[]
  dialogRef: any;
  ngOnInit(): void {
    this.phoneNumberService.getNumbers().subscribe(numbers => {
      this.phoneNumbers = numbers
    })       
  }
  @ViewChild(MatTable, { static: true }) table: MatTable<any>
  dataSource: PhoneNumber[] = []
  constructor(
    public dialog: MatDialog,
    private phoneNumberService: NumberService
  ){}

  openDialog(action, selectedNumber) {
    const dialogRef = this.dialog.open(NumberDialogBox, {
      width: '250px',
      data: { selectedNumber: selectedNumber, phoneNumbers: this.phoneNumbers, action: action }
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
  
  addRowData(row_obj: PhoneNumber) {
    if (!this.dataSource) {
      this.dataSource = []
    }
    this.dataSource.push({
      id: row_obj.id,
      phoneNumber: row_obj.phoneNumber,
      description: row_obj.description,
      environmentId: row_obj.environmentId,
      environmentName: row_obj.environmentName,
      position: '' + this.dataSource.length
    });
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    this.dataSource.forEach((value, key) => {
      console.log('value.position == row_obj.position ' + (key == row_obj.position))
      if (key == row_obj.position) {
        value.id = row_obj.id
        value.phoneNumber = row_obj.phoneNumber
        value.description = row_obj.description
        value.environmentId = row_obj.environmentId
        value.environmentName = row_obj.environmentName
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


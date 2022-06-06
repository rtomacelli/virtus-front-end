import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/service/user.service';
import {OfficeService} from 'src/app/service/office.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface Offices {
  id?:number;
  nome?: string;
  abreviatura?: string;
  descricao?: string;
  chefe_id?: number;
  usuarios?:User[];  
}

@Component({
  selector: 'app-list-office',
  templateUrl: './list-office.component.html',
  styleUrls: ['./list-office.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ListOfficeComponent implements OnInit {

  Offices:                    any = [];
  columnsToDisplay :          string[]  = ['id', 'nome', 'abreviatura', 'descricao', 'chefe_nome', 'acoes'];
  columnsToDisplayWithExpand: string[]  = ['id', 'nome', 'abreviatura', 'descricao', 'chefe_nome', 'acoes'];
  expandedElement: Offices | null;

  constructor(public officeService: OfficeService) {}
  
  ngOnInit() {
    this.fetchOffices();
    this.Offices.action = 'editar';
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.officeService.deleteOffice(id).subscribe((res) => {
        this.officeService.getOffice();
      });
    }
  }

  fetchOffices() {
    return this.officeService.getOffice().subscribe((res: {}) => {
      this.Offices = res;
      setTimeout(() => {
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    },
    (error) => console.error(error)
    );
  }

}

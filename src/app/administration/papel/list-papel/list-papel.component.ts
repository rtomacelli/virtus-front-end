import { HttpClient } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PapelService } from 'src/app/service/papel.service';

@Component({
  selector: 'app-list-papel',
  templateUrl: './list-papel.component.html',
  styleUrls: ['./list-papel.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})

export class ListPapelComponent implements OnInit {

  papeis: any = [];

  constructor(public papelService: PapelService) {}
  
  ngOnInit() {
    this.fetchPapel();
  }


  fetchPapel() {
    return this.papelService.getPapeis().subscribe((res: {}) => {
      this.papeis = res;
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

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.papelService.deletePapel(id).subscribe((res) => {
        this.fetchPapel();
      });
    }
  }
}

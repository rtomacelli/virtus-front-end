import { HttpClient } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/service/perfil.service';


@Component({
  selector: 'app-list-perfil',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['./list-perfil.component.css'],
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

export class ListPerfilComponent implements OnInit {

  Perfis: any = [];

  constructor(public perfilService: PerfilService) {}
  
  ngOnInit() {
    this.fetchPerfil();
  }


  fetchPerfil() {
    return this.perfilService.getPerfil().subscribe((res: {}) => {
      this.Perfis = res;
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
      this.perfilService.deletePerfil(id).subscribe((res) => {
        this.fetchPerfil();
      });
    }
  }

}

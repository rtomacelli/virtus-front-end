import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from "../../../service/perfil.service";

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css']
})
export class EditPerfilComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  objetoPerfis: any = {};

  constructor(
    public perfilService: PerfilService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.perfilService.getSinglePerfil(this.id).subscribe((res: {}) => {
      this.objetoPerfis = res;
    });
  }

  updatePerfil(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.perfilService.updatePerfil(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }


}

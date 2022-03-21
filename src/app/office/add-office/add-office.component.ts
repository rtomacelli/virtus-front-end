import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OfficeService } from "../../service/office.service";

@Component({
  selector: 'app-add-office',
  templateUrl: './add-office.component.html',
  styleUrls: ['./add-office.component.css']
})
export class AddOfficeComponent implements OnInit {

@Input() officeObj = { nome: '', abreviatura: '', descricao: '', chefe_id: 0, author_id: 0, criado_em: '', id_versao_origem: 0, status_id: 0 }

constructor(
  public officeService: OfficeService, 
  public router: Router
) { }

ngOnInit(): void { }

addOffice(data: any) {
  this.officeObj.criado_em = new Date().toISOString();
  this.officeService.addOffice(this.officeObj).subscribe((data: {}) => {
    this.router.navigate(['/list'])
  })
}

}
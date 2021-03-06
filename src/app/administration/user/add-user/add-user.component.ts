import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../../service/user.service";
import { PerfilService } from "../../../service/perfil.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  usuarioForm = new FormGroup({
    nome: new FormControl(''), 
    abreviatura: new FormControl(''),
    descricao: new FormControl(''),
    chefe_id: new FormControl(''),
  });

  @Input() usuario = { username: '', password: '', email: '', telefone: '', nome: '', papel_id: 0}
  Papeis: any = [];

  constructor(
    public userService: UserService,
    public perfilService: PerfilService,
    public router: Router
  ) { }

  ngOnInit(): void { 
    this.perfilService.getPerfil().subscribe((res: {}) => {
      this.Papeis = res;
    });
  }
  
  addUser(data: any) {
    this.userService.addUser(this.usuario).subscribe((data: {}) => {
      this.router.navigate(['/user/list'])
    })
  }

}

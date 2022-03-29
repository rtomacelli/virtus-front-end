import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
  
@Component({
  selector: 'office-form',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})

export class OfficeComponent  implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

//	private String nome;
//	private String abreviatura;
//	private String descricao;
//	private int chefe_id;
//	private int author_id;
//	private Timestamp criado_em;
//	private int id_versao_origem;
//	private int status_id;

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
  
  resetForm(){
    this.form.reset(); 
    return false;
  }

}
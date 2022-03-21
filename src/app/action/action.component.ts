import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

//  private String name;
//  private int origin_status_id;
//  private int destination_status_id;
//  private boolean other_than;
//  private String description;
//  private int author_id;
//  private Timestamp created_at;
//  private int id_versao_origem;
//  private int status_id;

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
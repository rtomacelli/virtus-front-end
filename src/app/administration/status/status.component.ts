import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
  
@Component({
  selector: 'status-form',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent {

  constructor(
    private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin": "*",    
      "Access-Control-Allow-Methods": "DELETE,GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "text/plain,application/json",
   })
  };

  private numbersUrl = 'http://localhost:5002/number';

//    private String name;
//    private String description;
//    private int author_id;
//    private Timestamp created_at ;
//    private int id_versao_origem;
//    private int status_id;
//    private String stereotype;
  
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
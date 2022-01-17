import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user/user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  public model: User = new User(
    '', ''
  );
  
  constructor(
    private route: ActivatedRoute,    
    private router: Router,
    private userService: UserService
  ) { 
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if(id!=0){
      this.getUser(id);
    } else {
      this.newUser();
    }
  }

  submitted = false;
  ngOnInit(): void {
  }
  onSubmit() { 
    if(!this.model.id){
      this.userService.addUser(this.model).subscribe(user => this.model = user)
    } else {
      this.userService.updateUser(this.model).subscribe(user => {
      })
    }
    this.submitted = true; 
  }
  newUser() {
    this.model = new User('', '');
  }
  getUser(id:number): void {
    this.userService.getUser(id).subscribe(user => this.model = user)
  }
  editUser(id:number): void {
    this.userService.getUser(id).subscribe(user => this.model = user)
    this.submitted = true; 
  }

  goBack(){
    this.submitted = false; 
    console.log("goBack: "+this.model.id)
    this.getUser(this.model.id)
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  @Input() userObj = { username: '', password: '', email: '', mobile: '', name: '', role_id: 0, author_id: 0, criado_em: ''}

  constructor(
    public userService: UserService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addUser(data: any) {
    this.userObj.criado_em = new Date().toISOString();
    this.userService.addUser(this.userObj).subscribe((data: {}) => {
      this.router.navigate(['/list'])
    })
  }

}
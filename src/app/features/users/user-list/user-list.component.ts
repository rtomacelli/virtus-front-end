import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser?:User;
  constructor(private userService: UserService, private messageService: MessageService) {}
  getUsers(): void {
    this.userService.getUsers().subscribe(users=>this.users = users);
  }
  ngOnInit(): void {
    this.getUsers();
  }
  onSelect(user:User): void{
    this.selectedUser = user;
    this.messageService.add(`UsersComponent: Selected user id=${user.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }
  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user.id).subscribe();
    
  }
}

import { Component, OnInit } from '@angular/core';
import { ActionService } from "../../service/action.service";

@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.css']
})
export class ListActionComponent implements OnInit {

  Actions: any = [];
  constructor(public actionService: ActionService) {}
  ngOnInit() {
    this.fetchActions();
  }
  fetchActions() {
    return this.actionService.getAction().subscribe((res: {}) => {
      this.Actions = res;
    });
  }
  delete(id: any) {
    if (window.confirm('Deseja realmente excluir esta ação?')) {
      this.actionService.deleteAction(id).subscribe((res) => {
        this.fetchActions();
      });
    }
  }

}

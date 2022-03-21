import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from "../../service/action.service";

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {

  @Input() actionObj = { name: '', origin_status_id: 0, destination_status_id: 0, other_than: false, description: false, author_id: 0, created_at: '', id_versao_origem: 0, status_id: 0 }

  constructor(
    public actionService: ActionService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addAction(data: any) {
    this.actionObj.created_at = new Date().toISOString();
    this.actionService.addAction(this.actionObj).subscribe((data: {}) => {
      this.router.navigate(['/list'])
    })
  }

}

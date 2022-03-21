import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from "../../service/status.service";

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent implements OnInit {

  @Input() statusObj = { name: '', description: '', author_id: 0, created_at: '', id_versao_origem: 0, status_id: 0, stereotype: '' }

  constructor(
    public statusService: StatusService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addStatus(data: any) {
    this.statusObj.created_at = new Date().toISOString();
    this.statusService.addStatus(this.statusObj).subscribe((data: {}) => {
      this.router.navigate(['/list'])
    })
  }

}

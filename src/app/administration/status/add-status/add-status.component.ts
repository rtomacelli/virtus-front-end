import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from "../../../service/status.service";

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent implements OnInit {

  @Input() statusObj = { name: '', description: '', stereotype: '' }

  constructor(
    public statusService: StatusService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addStatus(data: any) {
    this.statusService.addStatus(this.statusObj).subscribe((data: {}) => {
      this.router.navigate(['/status/list'])
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PapelService } from "../../../service/papel.service";

@Component({
  selector: 'app-add-papel',
  templateUrl: './add-papel.component.html',
  styleUrls: ['./add-papel.component.css']
})
export class AddPapelComponent implements OnInit {

  @Input() papelObj = {id: '', name: '', description: ''}

  constructor(
    public papelService: PapelService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addPapel(data: any) {
    this.papelService.addPapel(this.papelObj).subscribe((data: {}) => {
      this.router.navigate(['/papel/list'])
    })
  }

}

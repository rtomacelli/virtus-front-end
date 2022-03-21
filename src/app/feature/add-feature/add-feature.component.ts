import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureService } from "../../service/feature.service";

@Component({
  selector: 'app-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css']
})
export class AddFeatureComponent implements OnInit {

  @Input() featureObj = { name: '', code: '', description: '', author_id: 0, created_at: '', id_versao_origem: 0, status_id: 0 }

  constructor(
    public featureService: FeatureService, 
    public router: Router
  ) { }

  ngOnInit(): void { }
  
  addFeature(data: any) {
    this.featureObj.created_at = new Date().toISOString();
    this.featureService.addFeature(this.featureObj).subscribe((data: {}) => {
      this.router.navigate(['/list'])
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureService } from "../../../service/feature.service";


@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.css']
})
export class EditFeatureComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  featureObj: any = {};

  constructor(
    public featureService: FeatureService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.featureService.getSingleFeature(this.id).subscribe((res: {}) => {
      this.featureObj = res;
    });
  }

  updateFeature(id: any, data: any) {
    if (window.confirm('Confirma a atualização dos dados?')) {
      this.featureService.updateFeature(this.id, data).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }

}

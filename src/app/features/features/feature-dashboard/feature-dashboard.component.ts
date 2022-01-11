import { Component, OnInit } from '@angular/core';
import { Feature } from '../../../model/feature'
import { FeatureService } from '../../../service/feature/feature.service';

@Component({
  selector: 'app-feature-dashboard',
  templateUrl: './feature-dashboard.component.html',
  styleUrls: [ './feature-dashboard.component.css' ]
})
export class FeatureDashboardComponent implements OnInit {
  features: Feature[] = [];

  constructor(private featureService: FeatureService) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(): void {
    this.featureService.getFeatures()
      .subscribe(features => this.features = features.slice(0, 10));
  }
}

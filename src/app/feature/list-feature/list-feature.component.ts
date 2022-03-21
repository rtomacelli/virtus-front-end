import { Component, OnInit } from '@angular/core';
import { FeatureService } from "../../service/feature.service";

@Component({
  selector: 'app-list-feature',
  templateUrl: './list-feature.component.html',
  styleUrls: ['./list-feature.component.css']
})
export class ListFeatureComponent implements OnInit {

  Feature: any = [];
  constructor(public featureService: FeatureService) {}
  
  ngOnInit() {
    this.fetchFeature();
  }

  fetchFeature() {
    return this.featureService.getFeature().subscribe((res: {}) => {
      this.Feature = res;
    });
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      this.featureService.deleteFeature(id).subscribe((res) => {
        this.fetchFeature();
      });
    }
  }

}

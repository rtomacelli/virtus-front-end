import { Component, OnInit } from '@angular/core'
import { Feature } from 'src/app/model/feature';
import { FeatureService } from 'src/app/service/feature/feature.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements OnInit {
  features: Feature[] = [];
  selectedFeature?:Feature;
  constructor(private featureService: FeatureService, private messageService: MessageService) {}
  getFeatures(): void {
    this.featureService.getFeatures().subscribe(features=>this.features = features);
  }
  ngOnInit(): void {
    this.getFeatures();
  }
  onSelect(feature:Feature): void{
    this.selectedFeature = feature;
    this.messageService.add(`FeaturesComponent: Selected feature id=${feature.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.featureService.addFeature({ name } as Feature)
      .subscribe(feature => {
        this.features.push(feature);
      });
  }
  delete(feature: Feature): void {
    this.features = this.features.filter(h => h !== feature);
    this.featureService.deleteFeature(feature.id).subscribe();
    
  }
}

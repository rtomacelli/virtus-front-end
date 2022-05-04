import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FeatureService } from 'src/app/service/feature.service';

@Component({
  selector: 'app-list-feature',
  templateUrl: './list-feature.component.html',
  styleUrls: ['./list-feature.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ListFeatureComponent implements OnInit {

  Features: any = [];

  constructor(public featureService: FeatureService) {}
  
  ngOnInit() {
    this.fetchFeatures();
  }

  fetchFeatures() {
    return this.featureService.getFeature().subscribe((res: {}) => {
      this.Features = res;
      setTimeout(() => {
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25],
        });
      }, 1);
    },
    (error) => console.error(error)
    );
  }

  delete(id: any) {
    if (window.confirm('Deseja realmente excluir este escritório?')) {
      this.featureService.deleteFeature(id).subscribe((res) => {
        this.fetchFeatures();
      });
    }
  }


}

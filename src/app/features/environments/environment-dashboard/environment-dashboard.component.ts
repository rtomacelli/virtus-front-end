import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { Environment } from '../../../model/environment'

@Component({
  selector: 'app-environment-dashboard',
  templateUrl: './environment-dashboard.component.html',
  styleUrls: [ './environment-dashboard.component.css' ]
})
export class EnvironmentDashboardComponent implements OnInit {
  environments: Environment[] = [];

  constructor(private environmentService: EnvironmentService) { }

  ngOnInit(): void {
    this.getEnvironments();
  }

  getEnvironments(): void {
    this.environmentService.getEnvironments()
      .subscribe(environments => this.environments = environments.slice(0, 10));
  }
}

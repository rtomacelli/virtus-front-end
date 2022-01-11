import { Component, OnInit } from '@angular/core';
import { Run } from '../../../model/run'
import { RunService } from '../../../service/run/run.service';

@Component({
  selector: 'app-run-dashboard',
  templateUrl: './run-dashboard.component.html',
  styleUrls: [ './run-dashboard.component.css' ]
})
export class RunDashboardComponent implements OnInit {
  runs: Run[] = [];

  constructor(private runService: RunService) { }

  ngOnInit(): void {
    this.getRuns();
  }

  getRuns(): void {
    this.runService.getRuns()
      .subscribe(runs => this.runs = runs.slice(0, 10));
  }
}

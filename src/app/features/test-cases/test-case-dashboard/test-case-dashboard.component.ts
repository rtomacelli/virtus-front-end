import { Component, OnInit } from '@angular/core';
import { TestCase } from '../../../model/test-case'
import { TestCaseService } from '../../../service/test-case/test-case.service';

@Component({
  selector: 'app-test-case-dashboard',
  templateUrl: './test-case-dashboard.component.html',
  styleUrls: [ './test-case-dashboard.component.css' ]
})
export class TestCaseDashboardComponent implements OnInit {
  testCases: TestCase[] = [];

  constructor(private testCaseService: TestCaseService) { }

  ngOnInit(): void {
    this.getTestCases();
  }

  getTestCases(): void {
    this.testCaseService.getTestCases()
      .subscribe(testCases => this.testCases = testCases.slice(0, 10));
  }
}

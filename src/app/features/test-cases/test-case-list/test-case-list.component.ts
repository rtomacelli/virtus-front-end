import { Component, OnInit } from '@angular/core'
import { TestCase } from 'src/app/model/test-case';
import { TestCaseService } from 'src/app/service/test-case/test-case.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-test-case-list',
  templateUrl: './test-case-list.component.html',
  styleUrls: ['./test-case-list.component.css']
})
export class TestCaseListComponent implements OnInit {
  testCases: TestCase[] = [];
  selectedTestCase?:TestCase;
  constructor(private testCaseService: TestCaseService, private messageService: MessageService) {}
  getTestCases(): void {
    this.testCaseService.getTestCases().subscribe(testCases=>this.testCases = testCases);
  }
  ngOnInit(): void {
    this.getTestCases();
  }
  onSelect(testCase:TestCase): void{
    this.selectedTestCase = testCase;
    this.messageService.add(`TestCasesComponent: Selected test-case id=${testCase.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.testCaseService.addTestCase({ name } as TestCase)
      .subscribe(testCase => {
        this.testCases.push(testCase);
      });
  }
  delete(testCase: TestCase): void {
    this.testCases = this.testCases.filter(h => h !== testCase);
    this.testCaseService.deleteTestCase(testCase.id).subscribe();
    
  }
}

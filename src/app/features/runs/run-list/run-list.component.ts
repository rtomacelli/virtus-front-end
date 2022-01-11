import { Component, OnInit } from '@angular/core'
import { Run } from 'src/app/model/run';
import { RunService } from 'src/app/service/run/run.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.css']
})
export class RunListComponent implements OnInit {
  runs: Run[] = [];
  selectedRun?:Run;
  constructor(private runService: RunService, private messageService: MessageService) {}
  getRuns(): void {
    this.runService.getRuns().subscribe(runs=>this.runs = runs);
  }
  ngOnInit(): void {
    this.getRuns();
  }
  onSelect(run:Run): void{
    this.selectedRun = run;
    this.messageService.add(`RunsComponent: Selected run id=${run.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.runService.addRun({ name } as Run)
      .subscribe(run => {
        this.runs.push(run);
      });
  }
  delete(run: Run): void {
    this.runs = this.runs.filter(h => h !== run);
    this.runService.deleteRun(run.id).subscribe();
    
  }
}

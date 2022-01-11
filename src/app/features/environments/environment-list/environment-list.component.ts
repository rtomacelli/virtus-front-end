import { Component, OnInit } from '@angular/core'
import { Environment } from 'src/app/model/environment';
import { EnvironmentService } from 'src/app/service/environment/environment.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.css']
})
export class EnvironmentListComponent implements OnInit {
  environments: Environment[] = [];
  selectedEnvironment?:Environment;
  constructor(private environmentService: EnvironmentService, private messageService: MessageService) {}
  getEnvironments(): void {
    this.environmentService.getEnvironments().subscribe(environments=>this.environments = environments);
  }
  ngOnInit(): void {
    this.getEnvironments();
  }
  onSelect(environment:Environment): void{
    this.selectedEnvironment = environment;
    this.messageService.add(`EnvironmentsComponent: Selected environment id=${environment.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.environmentService.addEnvironment({ name } as Environment)
      .subscribe(environment => {
        this.environments.push(environment);
      });
  }
  delete(environment: Environment): void {
    this.environments = this.environments.filter(h => h !== environment);
    this.environmentService.deleteEnvironment(environment.id).subscribe();
    
  }
}

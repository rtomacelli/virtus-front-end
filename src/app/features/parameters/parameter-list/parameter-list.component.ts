import { Component, OnInit } from '@angular/core'
import { Parameter } from 'src/app/model/parameter';
import { ParameterService } from 'src/app/service/parameter/parameter.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.css']
})
export class ParameterListComponent implements OnInit {
  parameters: Parameter[] = [];
  selectedParameter?:Parameter;
  constructor(private parameterService: ParameterService, private messageService: MessageService) {}
  getParameters(): void {
    this.parameterService.getParameters().subscribe(parameters=>this.parameters = parameters);
  }
  ngOnInit(): void {
    this.getParameters();
  }
  onSelect(parameter:Parameter): void{
    this.selectedParameter = parameter;
    this.messageService.add(`ParametersComponent: Selected parameter id=${parameter.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.parameterService.addParameter({ name } as Parameter)
      .subscribe(parameter => {
        this.parameters.push(parameter);
      });
  }
  delete(parameter: Parameter): void {
    this.parameters = this.parameters.filter(h => h !== parameter);
    this.parameterService.deleteParameter(parameter.id).subscribe();
    
  }
}

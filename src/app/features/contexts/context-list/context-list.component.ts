import { Component, OnInit } from '@angular/core'
import { Context } from 'src/app/model/context';
import { ContextService } from 'src/app/service/context/context.service';
import { MessageService } from 'src/app/service/message/message.service';

@Component({
  selector: 'app-context-list',
  templateUrl: './context-list.component.html',
  styleUrls: ['./context-list.component.css']
})
export class ContextListComponent implements OnInit {
  contexts: Context[] = [];
  selectedContext?:Context;
  constructor(private contextService: ContextService, private messageService: MessageService) {}
  getContexts(): void {
    this.contextService.getContexts().subscribe(contexts=>this.contexts = contexts);
  }
  ngOnInit(): void {
    this.getContexts();
  }
  onSelect(context:Context): void{
    this.selectedContext = context;
    this.messageService.add(`ContextsComponent: Selected context id=${context.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.contextService.addContext({ name } as Context)
      .subscribe(context => {
        this.contexts.push(context);
      });
  }
  delete(context: Context): void {
    this.contexts = this.contexts.filter(h => h !== context);
    this.contextService.deleteContext(context.id).subscribe();
    
  }
}

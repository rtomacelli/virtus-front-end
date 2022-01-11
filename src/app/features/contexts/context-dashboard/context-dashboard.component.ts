import { Component, OnInit } from '@angular/core';
import { Context } from '../../../model/context'
import { ContextService } from '../../../service/context/context.service';

@Component({
  selector: 'app-context-dashboard',
  templateUrl: './context-dashboard.component.html',
  styleUrls: [ './context-dashboard.component.css' ]
})
export class ContextDashboardComponent implements OnInit {
  contexts: Context[] = [];

  constructor(private contextService: ContextService) { }

  ngOnInit(): void {
    this.getContexts();
  }

  getContexts(): void {
    this.contextService.getContexts()
      .subscribe(contexts => this.contexts = contexts.slice(0, 10));
  }
}

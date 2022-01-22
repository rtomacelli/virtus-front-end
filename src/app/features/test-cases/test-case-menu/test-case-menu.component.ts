import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test-case-menu',
  templateUrl: './test-case-menu.component.html',
  styleUrls: ['./test-case-menu.component.css']
})
export class TestCaseMenuComponent {
  constructor(private router: Router) { }
}

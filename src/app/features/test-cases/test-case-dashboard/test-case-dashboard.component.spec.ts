import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test-caseDashboardComponent } from './test-case-dashboard.component';

describe('Test-caseDashboardComponent', () => {
  let component: Test-caseDashboardComponent;
  let fixture: ComponentFixture<Test-caseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test-caseDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test-caseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextDashboardComponent } from './context-dashboard.component';

describe('ContextDashboardComponent', () => {
  let component: ContextDashboardComponent;
  let fixture: ComponentFixture<ContextDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

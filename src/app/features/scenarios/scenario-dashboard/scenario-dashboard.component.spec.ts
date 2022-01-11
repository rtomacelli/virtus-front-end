import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioDashboardComponent } from './scenario-dashboard.component';

describe('ScenarioDashboardComponent', () => {
  let component: ScenarioDashboardComponent;
  let fixture: ComponentFixture<ScenarioDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

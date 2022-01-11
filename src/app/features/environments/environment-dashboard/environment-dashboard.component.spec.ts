import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentDashboardComponent } from './environment-dashboard.component';

describe('EnvironmentDashboardComponent', () => {
  let component: EnvironmentDashboardComponent;
  let fixture: ComponentFixture<EnvironmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

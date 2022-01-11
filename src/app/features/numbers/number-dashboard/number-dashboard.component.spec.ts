import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberDashboardComponent } from './number-dashboard.component';

describe('NumberDashboardComponent', () => {
  let component: NumberDashboardComponent;
  let fixture: ComponentFixture<NumberDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

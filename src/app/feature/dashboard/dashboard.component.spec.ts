import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFeatureComponent } from './dashboard.component';

describe('DashboardFeatureComponent', () => {
  let component: DashboardFeatureComponent;
  let fixture: ComponentFixture<DashboardFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOfficeComponent } from './dashboard.component';

describe('DashboardOfficeComponent', () => {
  let component: DashboardOfficeComponent;
  let fixture: ComponentFixture<DashboardOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

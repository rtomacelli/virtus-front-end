import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPapelComponent } from './dashboard-papel.component';

describe('DashboardPapelComponent', () => {
  let component: DashboardPapelComponent;
  let fixture: ComponentFixture<DashboardPapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

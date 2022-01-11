import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSearchComponent } from './step-search.component';

describe('StepSearchComponent', () => {
  let component: StepSearchComponent;
  let fixture: ComponentFixture<StepSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSingleFormComponent } from './run-single-form.component';

describe('RunSingleFormComponent', () => {
  let component: RunSingleFormComponent;
  let fixture: ComponentFixture<RunSingleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunSingleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSingleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

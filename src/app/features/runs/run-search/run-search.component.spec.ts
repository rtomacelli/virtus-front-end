import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSearchComponent } from './run-search.component';

describe('RunSearchComponent', () => {
  let component: RunSearchComponent;
  let fixture: ComponentFixture<RunSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

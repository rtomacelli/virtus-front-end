import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextNumbersTableComponent } from './context-numbers-table.component';

describe('ContextNumbersTableComponent', () => {
  let component: ContextNumbersTableComponent;
  let fixture: ComponentFixture<ContextNumbersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextNumbersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextNumbersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

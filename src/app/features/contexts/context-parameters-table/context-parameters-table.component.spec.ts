import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextParametersTableComponent } from './context-parameters-table.component';

describe('ContextParametersTableComponent', () => {
  let component: ContextParametersTableComponent;
  let fixture: ComponentFixture<ContextParametersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextParametersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextParametersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

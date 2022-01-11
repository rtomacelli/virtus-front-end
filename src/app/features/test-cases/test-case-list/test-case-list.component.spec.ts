import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test-caseListComponent } from './test-case-list.component';

describe('Test-casesComponent', () => {
  let component: Test-caseListComponent;
  let fixture: ComponentFixture<Test-caseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test-caseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test-caseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

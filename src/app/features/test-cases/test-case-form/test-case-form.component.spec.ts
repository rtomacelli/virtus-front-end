import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test-caseFormComponent } from './test-case-form.component';

describe('Test-caseFormComponent', () => {
  let component: Test-caseFormComponent;
  let fixture: ComponentFixture<Test-caseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test-caseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test-caseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

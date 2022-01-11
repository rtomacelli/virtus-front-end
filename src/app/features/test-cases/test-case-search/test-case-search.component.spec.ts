import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Test-caseSearchComponent } from './test-case-search.component';

describe('Test-caseSearchComponent', () => {
  let component: Test-caseSearchComponent;
  let fixture: ComponentFixture<Test-caseSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Test-caseSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Test-caseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

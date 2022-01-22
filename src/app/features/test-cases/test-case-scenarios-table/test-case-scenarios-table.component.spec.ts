import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseScenariosTableComponent } from './test-case-scenarios-table.component';

describe('TestCaseScenariosTableComponent', () => {
  let component: TestCaseScenariosTableComponent;
  let fixture: ComponentFixture<TestCaseScenariosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseScenariosTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCaseScenariosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

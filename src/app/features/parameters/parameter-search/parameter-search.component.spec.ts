import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterSearchComponent } from './parameter-search.component';

describe('ParameterSearchComponent', () => {
  let component: ParameterSearchComponent;
  let fixture: ComponentFixture<ParameterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

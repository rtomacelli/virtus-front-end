import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentSearchComponent } from './environment-search.component';

describe('EnvironmentSearchComponent', () => {
  let component: EnvironmentSearchComponent;
  let fixture: ComponentFixture<EnvironmentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

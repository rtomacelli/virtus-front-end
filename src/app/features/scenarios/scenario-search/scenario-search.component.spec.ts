import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioSearchComponent } from './scenario-search.component';

describe('ScenarioSearchComponent', () => {
  let component: ScenarioSearchComponent;
  let fixture: ComponentFixture<ScenarioSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenarioSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedRowComponent } from './expanded-row.component';

describe('ExpandedRowComponent', () => {
  let component: ExpandedRowComponent;
  let fixture: ComponentFixture<ExpandedRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

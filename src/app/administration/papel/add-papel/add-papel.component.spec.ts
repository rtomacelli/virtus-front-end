import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPapelComponent } from './add-papel.component';

describe('AddPapelComponent', () => {
  let component: AddPapelComponent;
  let fixture: ComponentFixture<AddPapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

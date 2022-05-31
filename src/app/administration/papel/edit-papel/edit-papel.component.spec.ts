import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPapelComponent } from './edit-papel.component';

describe('EditPapelComponent', () => {
  let component: EditPapelComponent;
  let fixture: ComponentFixture<EditPapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

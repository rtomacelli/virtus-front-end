import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePapelComponent } from './delete-papel.component';

describe('DeletePapelComponent', () => {
  let component: DeletePapelComponent;
  let fixture: ComponentFixture<DeletePapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPapelComponent } from './list-papel.component';

describe('ListPapelComponent', () => {
  let component: ListPapelComponent;
  let fixture: ComponentFixture<ListPapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPapelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

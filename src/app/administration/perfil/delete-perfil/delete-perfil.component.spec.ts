import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePerfilComponent } from './delete-perfil.component';

describe('DeletePerfilComponent', () => {
  let component: DeletePerfilComponent;
  let fixture: ComponentFixture<DeletePerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

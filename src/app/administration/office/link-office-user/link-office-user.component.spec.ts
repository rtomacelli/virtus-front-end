import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkOfficeUserComponent } from './link-office-user.component';

describe('LinkOfficeUserComponent', () => {
  let component: LinkOfficeUserComponent;
  let fixture: ComponentFixture<LinkOfficeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkOfficeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkOfficeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

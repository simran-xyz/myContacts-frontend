import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContactDialogComponent } from './update-contact-dialog.component';

describe('UpdateContactDialogComponent', () => {
  let component: UpdateContactDialogComponent;
  let fixture: ComponentFixture<UpdateContactDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContactDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

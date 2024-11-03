import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDeleteConfirmationDialogComponent } from './class-delete-confirmation-dialog.component';

describe('ClassDeleteConfirmationDialogComponent', () => {
  let component: ClassDeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<ClassDeleteConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassDeleteConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassDeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeleteConfirmationDialogComponent } from './student-delete-confirmation-dialog.component';

describe('StudentDeleteConfirmationDialogComponent', () => {
  let component: StudentDeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<StudentDeleteConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDeleteConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

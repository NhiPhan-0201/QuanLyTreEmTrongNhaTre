import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdateFormComponent } from './student-update-form.component';

describe('StudentUpdateFormComponent', () => {
  let component: StudentUpdateFormComponent;
  let fixture: ComponentFixture<StudentUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

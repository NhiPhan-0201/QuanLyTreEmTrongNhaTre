import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddNewFormComponent } from './student-add-new-form.component';

describe('StudentAddNewFormComponent', () => {
  let component: StudentAddNewFormComponent;
  let fixture: ComponentFixture<StudentAddNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAddNewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAddNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAddNewFormComponent } from './class-add-new-form.component';

describe('ClassAddNewFormComponent', () => {
  let component: ClassAddNewFormComponent;
  let fixture: ComponentFixture<ClassAddNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAddNewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAddNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassUpdateFormComponent } from './class-update-form.component';

describe('ClassUpdateFormComponent', () => {
  let component: ClassUpdateFormComponent;
  let fixture: ComponentFixture<ClassUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

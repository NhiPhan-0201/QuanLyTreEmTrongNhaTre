import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementPageComponent } from './admin-management-page.component';

describe('AdminManagementPageComponent', () => {
  let component: AdminManagementPageComponent;
  let fixture: ComponentFixture<AdminManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

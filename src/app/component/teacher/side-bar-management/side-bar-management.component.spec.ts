import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaovienManagementPageComponent } from './side-bar-management.component';

describe('GiaovienManagementPageComponent', () => {
  let component: GiaovienManagementPageComponent;
  let fixture: ComponentFixture<GiaovienManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaovienManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaovienManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

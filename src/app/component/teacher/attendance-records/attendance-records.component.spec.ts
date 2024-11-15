import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaovienDiemdanhComponent } from './attendance-records.component';

describe('GiaovienDiemdanhComponent', () => {
  let component: GiaovienDiemdanhComponent;
  let fixture: ComponentFixture<GiaovienDiemdanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaovienDiemdanhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaovienDiemdanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

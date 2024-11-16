import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyLopComponent } from './class-management.component';

describe('QuanLyLopComponent', () => {
  let component: QuanLyLopComponent;
  let fixture: ComponentFixture<QuanLyLopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyLopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

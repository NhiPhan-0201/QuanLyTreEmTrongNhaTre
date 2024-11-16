import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyNhomLopComponent } from './class-group-management.component';

describe('QuanLyNhomLopComponent', () => {
  let component: QuanLyNhomLopComponent;
  let fixture: ComponentFixture<QuanLyNhomLopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyNhomLopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanLyNhomLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

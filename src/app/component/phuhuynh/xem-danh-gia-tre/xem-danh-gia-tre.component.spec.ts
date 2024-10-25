import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemDanhGiaTreComponent } from './xem-danh-gia-tre.component';

describe('XemDanhGiaTreComponent', () => {
  let component: XemDanhGiaTreComponent;
  let fixture: ComponentFixture<XemDanhGiaTreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XemDanhGiaTreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XemDanhGiaTreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

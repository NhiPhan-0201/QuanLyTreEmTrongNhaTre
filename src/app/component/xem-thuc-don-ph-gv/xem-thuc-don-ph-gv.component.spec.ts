import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemThucDonPHGvComponent } from './xem-thuc-don-ph-gv.component';

describe('XemThucDonPHGvComponent', () => {
  let component: XemThucDonPHGvComponent;
  let fixture: ComponentFixture<XemThucDonPHGvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XemThucDonPHGvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XemThucDonPHGvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

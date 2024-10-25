import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemThucDonComponent } from './xem-thuc-don.component';

describe('XemThucDonComponent', () => {
  let component: XemThucDonComponent;
  let fixture: ComponentFixture<XemThucDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XemThucDonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XemThucDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

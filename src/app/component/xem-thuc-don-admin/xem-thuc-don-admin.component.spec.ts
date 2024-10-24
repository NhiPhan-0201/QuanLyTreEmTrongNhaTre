import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemThucDonAdminComponent } from './xem-thuc-don-admin.component';

describe('XemThucDonAdminComponent', () => {
  let component: XemThucDonAdminComponent;
  let fixture: ComponentFixture<XemThucDonAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XemThucDonAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XemThucDonAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

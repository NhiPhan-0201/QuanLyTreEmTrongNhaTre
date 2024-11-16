import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaovienNoidungthongbaoComponent } from './notification-content.component';

describe('GiaovienNoidungthongbaoComponent', () => {
  let component: GiaovienNoidungthongbaoComponent;
  let fixture: ComponentFixture<GiaovienNoidungthongbaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaovienNoidungthongbaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaovienNoidungthongbaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

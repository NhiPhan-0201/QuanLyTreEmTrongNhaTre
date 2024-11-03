import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaovienDanhsachthongbaoComponent } from './giaovien-danhsachthongbao.component';

describe('GiaovienDanhsachthongbaoComponent', () => {
  let component: GiaovienDanhsachthongbaoComponent;
  let fixture: ComponentFixture<GiaovienDanhsachthongbaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaovienDanhsachthongbaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaovienDanhsachthongbaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

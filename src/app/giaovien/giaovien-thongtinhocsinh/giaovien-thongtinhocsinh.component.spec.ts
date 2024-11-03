import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaovienThongtinhocsinhComponent } from './giaovien-thongtinhocsinh.component';

describe('GiaovienThongtinhocsinhComponent', () => {
  let component: GiaovienThongtinhocsinhComponent;
  let fixture: ComponentFixture<GiaovienThongtinhocsinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaovienThongtinhocsinhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaovienThongtinhocsinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

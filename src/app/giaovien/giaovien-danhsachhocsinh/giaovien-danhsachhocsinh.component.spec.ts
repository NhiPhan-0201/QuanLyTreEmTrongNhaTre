import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaovienDanhsachhocsinhComponent } from './giaovien-danhsachhocsinh.component';

describe('GiaovienDanhsachhocsinhComponent', () => {
  let component: GiaovienDanhsachhocsinhComponent;
  let fixture: ComponentFixture<GiaovienDanhsachhocsinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiaovienDanhsachhocsinhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiaovienDanhsachhocsinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

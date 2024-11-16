import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchoolfeeComponent } from './view-schoolfee.component';

describe('ViewSchoolfeeComponent', () => {
  let component: ViewSchoolfeeComponent;
  let fixture: ComponentFixture<ViewSchoolfeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSchoolfeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSchoolfeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

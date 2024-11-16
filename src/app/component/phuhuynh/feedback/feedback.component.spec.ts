import { ComponentFixture, TestBed } from '@angular/core/testing';

import { feedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: feedbackComponent;
  let fixture: ComponentFixture<feedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [feedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(feedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

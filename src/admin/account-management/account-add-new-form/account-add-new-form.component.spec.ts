import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddNewFormComponent } from './account-add-new-form.component';

describe('AccountAddNewFormComponent', () => {
  let component: AccountAddNewFormComponent;
  let fixture: ComponentFixture<AccountAddNewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountAddNewFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountAddNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

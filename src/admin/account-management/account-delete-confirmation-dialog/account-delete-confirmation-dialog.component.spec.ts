import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteConfirmationDialogComponent } from './account-delete-confirmation-dialog.component';

describe('AccountDeleteConfirmationDialogComponent', () => {
  let component: AccountDeleteConfirmationDialogComponent;
  let fixture: ComponentFixture<AccountDeleteConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDeleteConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDeleteConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

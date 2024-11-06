import { Injectable } from '@angular/core';
import { ToastComponent } from '../component/common';
import { ToastType } from '../component/common/alerts/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent!: ToastComponent;

  setToastComponent(toast: ToastComponent) {
    this.toastComponent = toast;
  }

  showInfo(message: string) {
    if (this.toastComponent) {
      this.toastComponent.showToast(message, ToastType.INFO);
    }
  }

  showSuccess(message: string) {
    if (this.toastComponent) {
      this.toastComponent.showToast(message, ToastType.SUCCESS);
    }
  }

  showError(message: string) {
    if (this.toastComponent) {
      this.toastComponent.showToast(message, ToastType.ERROR);
    }
  }

  showWarning(message: string) {
    if (this.toastComponent) {
      this.toastComponent.showToast(message, ToastType.WARNING);
    }
  }
}

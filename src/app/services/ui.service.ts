import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  Confirmation,
  ConfirmationService,
  Message,
  MessageService,
} from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class UIService {
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  sidebarIsOpen$ = new BehaviorSubject<boolean>(false);

  showSidebar() {
    this.sidebarIsOpen$.next(true);
  }
  hideSidebar() {
    this.sidebarIsOpen$.next(false);
  }

  showToast(message: Message) {
    this.messageService.add({
      ...message,
      life: 1500,
      key: 'data',
      closable: false,
    });
  }

  showConfirmation(confirmation: Confirmation) {
    this.confirmationService.confirm({
      ...confirmation,
      acceptLabel: confirmation.acceptLabel ?? 'Ano',
      rejectLabel: confirmation.rejectLabel ?? 'Ne',
      acceptButtonStyleClass:
        confirmation.acceptButtonStyleClass ?? 'p-button-text',
      rejectButtonStyleClass:
        confirmation.rejectButtonStyleClass ??
        'p-button-text p-button-secondary',
      key: 'confirmation',
      reject:
        confirmation.reject ??
        (() => {
          return;
        }),
    });
  }
}

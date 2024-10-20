import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIService {
  sidebarIsOpen$ = new BehaviorSubject<boolean>(false);

  showSidebar() {
    this.sidebarIsOpen$.next(true);
  }
  hideSidebar() {
    this.sidebarIsOpen$.next(false);
  }
}

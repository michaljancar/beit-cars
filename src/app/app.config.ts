import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import localeCs from '@angular/common/locales/cs';
registerLocaleData(localeCs, 'cs');

import { routes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'cs-CZ' },
    provideAnimationsAsync(),
    ConfirmationService,
    MessageService,
  ],
};

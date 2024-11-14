// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';  // Correct import of appRoutes
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Zone change detection optimization
    provideRouter(appRoutes),                                // Provide the router with appRoutes
    provideClientHydration(),                                 // Client-side hydration (for SSR or client rendering)
  ]
};

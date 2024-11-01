import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import { provideEffects } from '@ngrx/effects';
import {UserEffects} from "./store/user/user.effects";
import { reducers } from './store/user/user.reducer';
import {progressInterceptor} from "ngx-progressbar/http";
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers),
    provideHttpClient(withFetch(),withInterceptors([progressInterceptor])),
    provideEffects([UserEffects]),
    provideStoreDevtools({
      maxAge: 25,
    })
  ]
};

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Auth } from '../pages/auth/service/auth';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthDto } from '../pages/auth/models/auth.dto';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  message: string | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  message: null,
  error: null,
  token: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(Auth)) => ({
    authentication: rxMethod<AuthDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true, isAuthenticated: false, message: null, error: null })),
        switchMap((dto) => {
          return authService.login(dto).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  isAuthenticated: true,
                  message: 'Login successful',
                  isLoading: false,
                  error: null
                });
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: error.message,
                  isAuthenticated: false,
                  message: null
                });
              },
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);

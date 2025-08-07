import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../core/models/user.model';
import { Auth } from '../pages/auth/service/auth';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthDto } from '../pages/auth/models/auth.dto';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(Auth)) => ({
    authentication: rxMethod<AuthDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((dto) => {
          return authService.login(dto).pipe(
            tapResponse({
              next: (response) => {
                console.log('AQUI LOGIN SUCCESS: ', response);
                patchState(store, {
                  token: response.token,
                  isAuthenticated: true,
                });
              },
              error: (error: HttpErrorResponse) => {
                console.log('AQUI LOGIN ERROR: ', error);
                patchState(store, {
                  error: error.message,
                  isAuthenticated: false,
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

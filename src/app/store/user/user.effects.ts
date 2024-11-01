import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  loadUserSuccess,
  loadUserFailure,
  loadUser
} from './user.actions';
import {catchError, map, switchMap, withLatestFrom, filter, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UsersService} from '../../users/services/users.service';
import {Store} from '@ngrx/store';
import {selectAllUsers} from './user.selectors';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(this.store.select(selectAllUsers)),
      switchMap(([action, users]: any) => {
        if (users.page == action.page) {
          return of(loadUsersSuccess({users: users}));
        }
        return this.userService.getUsers(action.page).pipe(
          map((response) => loadUsersSuccess({users: response})),
          catchError((error) => of(loadUsersFailure({error: error.message})))
        )
      })
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      withLatestFrom(this.store.select(selectAllUsers)),
      switchMap(([action, users]: any) => {
        const existingUser = users?.data?.find((user: any) => user.id == action.id);
        if (existingUser) {
          return of(loadUserSuccess({user: existingUser}));
        }
        return this.userService.getUserById(action.id).pipe(
          map((response) => loadUserSuccess({user: response.data})),
          catchError((error) => of(loadUserFailure({error: error.message})))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UsersService,
    private store: Store<any>
  ) {
  }
}

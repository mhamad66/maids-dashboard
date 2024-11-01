import {createAction, props} from '@ngrx/store';
import {User} from "../../models/user";

export const loadUsers = createAction(
  '[User API] Load Users',
  props<{ page: number }>()
);

export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: any }>()
);

export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: string }>()
);

export const loadUser = createAction(
  '[User API] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[User API] Load User Success',
  props<{ user: User }>()
);
export const loadUserFailure = createAction(
  '[User API] Load User Failure',
  props<{ error: string }>()
);

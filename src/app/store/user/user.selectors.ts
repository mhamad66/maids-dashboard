import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUser = createSelector(
  selectUserState,
  (state: any) => ({
    selectedUser: state.selectedUser,
    error: state.error
  })
);

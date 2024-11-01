import {createReducer, on} from '@ngrx/store';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure
} from './user.actions';

export interface UserState {
  users: any[];
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({...state, loading: true, error: null})),
  on(loadUser, (state) => ({...state, loading: true, error: null})),

  on(loadUsersSuccess, (state, {users}) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),

  on(loadUsersFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),

  on(loadUserSuccess, (state, {user}) => ({
    ...state,
    users: state.users,
    selectedUser: user,
    loading: false,
    error: null
  })),

  on(loadUserFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  }))
);

export const reducers = {users: userReducer};

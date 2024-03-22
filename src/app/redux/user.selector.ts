import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';


// Lấy trạng thái của user feature từ AppState
export const selectUserState = createFeatureSelector<UserState>('users');

// Lấy danh sách người dùng từ trạng thái của user feature
export const selectUserList = createSelector(
    selectUserState,
    (state: UserState) => state.users
  );
  export const selectLoggedUser = createSelector(
    selectUserState,
    (state: UserState) => state.loggedUser
  );
  export const selectLoggedIn = createSelector(
    selectUserState,
    (state: UserState) => state.loggedIn
  );
 
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[User] Login',
  props<{ username: string; password: string }>()
);
export const signup = createAction(
    '[User] Signup',
    props<{ username: string; password: string; email: string; phonenumber: string }>()
);
export const logout = createAction(
  '[Auth] Logout'
);
export const deleteUser = createAction(
  '[User] Delete User', 
  props<{ userId: number }>()
  );

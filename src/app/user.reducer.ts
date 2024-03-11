import { createReducer, on } from '@ngrx/store';
import { deleteUser, login, logout, signup, updateUser } from './user.action';
import { User } from './user.model';

export interface UserState {
    users:User[];
    loggedUser: any | null; 
    loggedIn:boolean
}

export const initialState: UserState = {
   users:[],
   loggedUser: null,
   loggedIn:false
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, { username, password }) => {
    const logged = state.users.find((u) => u.username === username && u.password === password);
    if (logged) {
      console.log('Login Successful');
      return {
        ...state,
        loggedUser: logged,
        loggedIn:true
      };
    }
    else{
        console.log('fail');
        return {
          ...state,
          loggedUser: null
        };
    }
  }),
  on(signup, (state, { username, password, email, phonenumber }) => {
    const id = state.users.length + 1;
    const newUser: User = {
      id,
      username,
      password,
      email,
      phonenumber,
    };
    return {
      ...state,
      users: [...state.users, newUser],
    };
  }),
  on(logout, (state) => ({ ...state, loggedIn: false,loggedUser:null })),
  on(deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
  })),
  on(updateUser, (state, { updateUser }) => {
    return{
      ...state,
      users: state.users.map(user => {
        if (user.id === updateUser.id) {
          return { ...user, ...updateUser};
        }
        return user;
      })
    };
  })
  
);
import React from "react";
import { INITIAL_USER, User } from "./User";

enum UserActionType {
  NEW_USER = "NEW_USER",
  MODIFY_USER = "MODIFY_USER",
  RESET_USER = "RESET_USER",
}

export interface UserReducerState {
  user: Partial<User>;
  // eslint-disable-next-line no-use-before-define
  dispatch: React.Dispatch<IUserReducer>;
}

interface IUserReducer {
  type: UserActionType;
  reducerState: UserReducerState;
}

const INITIAL_STATE: UserReducerState = {
  user: INITIAL_USER,
  dispatch: () => {
    throw new Error("Dispatch should have been initialized");
  },
};

export const userReducer: React.Reducer<UserReducerState, IUserReducer> = (
  state,
  { type: actionType, reducerState },
) => {
  switch (actionType) {
    case UserActionType.RESET_USER:
      return {
        ...reducerState,
        user: INITIAL_USER,
      };
    case UserActionType.NEW_USER:
      return {
        ...reducerState,
        user: {
          ...INITIAL_USER,
          ...reducerState.user,
        },
      };
    case UserActionType.MODIFY_USER:
      return {
        ...reducerState,
        user: {
          ...state.user,
          ...reducerState.user,
        },
      };
    default:
      return state;
  }
};

export const UserContext = React.createContext<UserReducerState>(INITIAL_STATE);

export const modifyUser = (user: Partial<User>, dispatch: React.Dispatch<IUserReducer>): void => {
  dispatch({
    type: UserActionType.MODIFY_USER,
    reducerState: {
      user,
      dispatch,
    },
  });
};

export const createNewUser = (
  user: Partial<User>,
  dispatch: React.Dispatch<IUserReducer>,
): void => {
  dispatch({
    type: UserActionType.NEW_USER,
    reducerState: {
      user,
      dispatch,
    },
  });
};

export const resetUser = (dispatch: React.Dispatch<IUserReducer>): void => {
  dispatch({
    type: UserActionType.RESET_USER,
    reducerState: {
      user: {},
      dispatch,
    },
  });
};

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, dispatch] = React.useReducer(userReducer, INITIAL_STATE);

  return <UserContext.Provider value={{ ...user, dispatch }}>{children}</UserContext.Provider>;
};

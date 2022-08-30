import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { INITIAL_USER, User } from "../models/user/User";
import { UserContext, userReducer, UserReducerState } from "../models/user/UserStore";

interface UserProviderProps {
  customUser: Partial<User>;
}

interface CustomUserRenderOptions extends RenderOptions {
  userProviderProps?: UserProviderProps;
}

const INITIAL_STATE: UserReducerState = {
  user: INITIAL_USER,
  dispatch: () => {
    throw new Error("Dispatch should have been initialized");
  },
};

const CustomUserProvider: React.FC<UserProviderProps> = ({ children, customUser }) => {
  const initialStateUser = {
    ...INITIAL_STATE,
    user: {
      ...INITIAL_STATE.user,
      ...customUser,
    },
  };

  const [user, dispatch] = React.useReducer(userReducer, initialStateUser);

  return <UserContext.Provider value={{ ...user, dispatch }}>{children}</UserContext.Provider>;
};

const UserProviderWrapper: React.FC<UserProviderProps> = ({ children, customUser }) => {
  return <CustomUserProvider customUser={customUser}>{children}</CustomUserProvider>;
};

// Idea here from https://github.com/testing-library/react-testing-library/issues/780
const customRender = (ui: React.ReactElement, options?: CustomUserRenderOptions) =>
  render(ui, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wrapper: (props: any) => <UserProviderWrapper {...props} {...options?.userProviderProps} />,
    ...options,
  });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as renderWithUser };

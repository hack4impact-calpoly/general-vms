import React from "react";

interface IProps {
  children?: React.ReactNode;
}

export const Authenticator = ({ children }: IProps) => {
  return (
    <>
      <p>Authenticator Mock</p>
      {children}
    </>
  );
};

Authenticator.Provider = ({ children }: IProps) => {
  return children;
};

const DEFAULT_AUTH = {
  route: "authenticated",
  user: {
    username: "test_username",
    attributes: {
      email: "test+email@email.com",
    },
    getSignInUserSession: () => ({
      getAccessToken: () => "test_token",
    }),
  },
};

interface IUseAuthArgs {
  route: string;
  user: {
    username: string;
    attributes: {
      email: string;
    };
  };
  getSignInUserSession: () => {
    getAccessToken: () => string;
  };
}

export const overrideAuthenticatorReturn = (authArgs: Partial<IUseAuthArgs>) => {
  useAuthenticator.mockReturnValueOnce({
    ...DEFAULT_AUTH,
    ...authArgs,
  });
};

export const useAuthenticator = jest.fn().mockReturnValue(DEFAULT_AUTH);

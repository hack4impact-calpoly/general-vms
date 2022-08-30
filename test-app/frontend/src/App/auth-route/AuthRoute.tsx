import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { useContext, useEffect } from "react";
import { Role, Roles } from "src/models/user/User";
import { createNewUser, UserContext } from "src/models/user/UserStore";

interface IProps {
  allowedRoles: Set<Role>;
  children: JSX.Element;
}

export const AuthRoute = ({ allowedRoles, children }: IProps) => {
  const { route, user: cognitoUser } = useAuthenticator((context) => {
    return [context.route, context.user];
  });

  const { user: appUser, dispatch } = useContext(UserContext);

  useEffect(() => {
    if (route === "authenticated" && cognitoUser) {
      createNewUser(
        {
          name: cognitoUser.username,
          email: cognitoUser.attributes?.email,
          userId: undefined,
          userLoggedIn: true,
          role: Roles.STAFF,
          userApproved: false,
          cognitoSession: cognitoUser.getSignInUserSession()?.getAccessToken(),
        },
        dispatch,
      );
    }
  }, [route, cognitoUser]);

  if (route !== "authenticated" || !appUser.userLoggedIn) {
    return <Authenticator />;
  }

  if (!allowedRoles.has(appUser.role)) {
    return <p>You are not allowed to view this page. Logout and login to something with auth!</p>;
  }

  return children;
};

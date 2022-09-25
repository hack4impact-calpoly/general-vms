import { screen } from "@testing-library/react";
import { ADMIN_ROLES, ALL_ROLES, Role } from "../../models/user/User";
import { renderWithUser } from "../../test-utils/user-utils";
import { overrideAuthenticatorReturn } from "../../__mocks__/@aws-amplify/ui-react";
import { AuthRoute } from "./AuthRoute";

const getDefaultRender = (roles: Set<Role>) => (
  <AuthRoute allowedRoles={roles}>
    <p>Inner auth route</p>
  </AuthRoute>
);

describe("AuthRoute component", () => {
  it("should show the component if authenticated", () => {
    renderWithUser(getDefaultRender(ALL_ROLES));

    expect(screen.queryByText("Authenticator Mock")).toBeFalsy();
    expect(screen.queryByText("Inner auth route")).toBeTruthy();
  });

  it("should show the Authenticator", () => {
    overrideAuthenticatorReturn({ route: "garbage" });

    renderWithUser(getDefaultRender(ALL_ROLES));

    expect(screen.queryByText("Authenticator Mock")).toBeTruthy();
    expect(screen.queryByText("Inner auth route")).toBeFalsy();
  });

  it("should show the Authenticator", () => {
    renderWithUser(getDefaultRender(ADMIN_ROLES));

    expect(screen.queryByText("Authenticator Mock")).toBeFalsy();
    expect(
      screen.queryByText("You are not allowed to view this page", { exact: false }),
    ).toBeTruthy();
  });
});
